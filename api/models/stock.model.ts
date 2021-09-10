import { v4 } from 'uuid'

export class Stock {
  
  id?: string
  name: string
  price: number
  quantity: number

  constructor(name: string, price: number, quantity: number, id?: string) {
    this.name = name
    this.price = price
    this.quantity = quantity

    if(!id)
      this.id = v4()
    else
      this.id = id
  }
}