import { EachMessagePayload } from 'kafkajs'
import consumer from './consumer';
import { Log } from './models/log';
import logRespository from './repositories/log.respository';

function message({ topic, message, partition }: EachMessagePayload) {
  const log = JSON.parse(message.value.toString())
  logRespository.create(new Log(log.method, log.message))
}

(async () => {
  await consumer.connect()
  await consumer.subscribe('log-product')
  await consumer.run(message)
})();

