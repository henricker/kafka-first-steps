import { v4 } from 'uuid'

export class Log {
  
  id: string
  method: string
  message: string

  constructor(method: string, message: string, id?: string) {
    this.method = method
    this.message = message

    if(!id)
      this.id = v4()
    else
      this.id = id
  }
}