import { CompressionTypes, Kafka, Message, Producer as KafkaProducer } from 'kafkajs'

const kafka = new Kafka({
  clientId: 'api',
  brokers: ['localhost:9092']
})

class Producer {
  private producer: KafkaProducer;

  constructor() {
    this.producer = kafka.producer({
      allowAutoTopicCreation: true, 
    })
  }

  async connect() {
    await this.producer.connect()
  }

  async disconect() {
    await this.producer.disconnect()
  }

  async sendMessage(messages: Array<Message>, topic: string, compression?: CompressionTypes) {
    await this.producer.send({
      topic,
      messages,
      compression
    })
  }
}

export default new Producer()