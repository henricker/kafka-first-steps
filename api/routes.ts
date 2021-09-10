import { IncomingMessage, ServerResponse } from "http";
import { Stock } from "./models/stock.model";
import stockRepository from "./repositories/stock.repository";
import producer from "./producer";

class Routes {
  async delete(request: IncomingMessage, response: ServerResponse) {
    const queryParams = await this.queryParams(request.url)
    const stock = await stockRepository.findById(queryParams['id'])

    if(!stock)
      return response.end(JSON.stringify({ error: 'product not found' }))
    
    await stockRepository.delete(queryParams['id'])

    //send event to kafka to our system of logs
    const log = {
      method: request.method.toLocaleLowerCase(),
      message: `${stock.id} => has been removed`
    }

    await producer.connect()
    await producer.sendMessage([{value: JSON.stringify(log)}], 'log-product')
    await producer.disconect()

    response.end(JSON.stringify(stock))
  }
  
  async get(request: IncomingMessage, response: ServerResponse) {
    const stocks = await stockRepository.findAll()
    response.end(JSON.stringify(stocks))
  }

  async post(request: IncomingMessage, response: ServerResponse) {
    request.on('data', async (data) => {
      const body = JSON.parse(data.toString())
      const stock = await stockRepository.create(new Stock(body.name, body.price, body.quantity))

      //send event to kafka to our system of logs
      const log = {
        method: request.method.toLocaleLowerCase(),
        message: `${stock.id} => has been created`
      }

      await producer.connect()
      await producer.sendMessage([{value: JSON.stringify(log)}], 'log-product')
      await producer.disconect()

      response.writeHead(201)
      response.end()
    })
  }
  
  private async queryParams(requestUrl: string) {
    const queryParamsString = requestUrl.split('?')[1]
    const queryParams = queryParamsString.split('&')

    const query = Object.fromEntries(queryParams.map((params) => params.split("=")))
    return query
  }

  async handle(request: IncomingMessage, response: ServerResponse) {
    return this[request.method?.toLocaleLowerCase() ?? 'get'].apply(this, [request, response])
  }
}

export default new Routes()