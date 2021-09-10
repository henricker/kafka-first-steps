import { Kafka, Consumer as KafkaConsumer } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'log-service',
  brokers: ['localhost:9092']
})

class Consumer {
  private consumer: KafkaConsumer
  constructor() {
    this.consumer = kafka.consumer({
      groupId: 'log-product-service'
    })
  }

  async connect() {
    await this.consumer.connect()
  }

  async disconnect() {
    await this.consumer.disconnect()
  }

  async subscribe(topic: string) {
    await this.consumer.subscribe({ topic })
  }

  async run(callback: Function) {
    await this.consumer.run({
      eachMessage: async ({ partition, message, topic }) => callback({ partition, message, topic })
    })
  }
}

export default new Consumer()