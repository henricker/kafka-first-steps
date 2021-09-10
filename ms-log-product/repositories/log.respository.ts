import path from "path/posix"
import Repository from "../../util/repository"
import { Log } from "../models/log"

class LogRepository extends Repository<Log> {
  constructor(databasePath: string, databaseName: string) {
    super(databasePath, databaseName)
  }
}

export default new LogRepository(path.resolve(__dirname, '..', 'database', 'database.json'), 'logs')