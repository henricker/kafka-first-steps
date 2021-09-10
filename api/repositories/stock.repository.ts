import { Stock } from "../models/stock.model";
import path from 'path'
import Repository from "../../util/repository";

export class StockRepository extends Repository<Stock>{
  constructor(databasePath: string, databaseName: string) {
    super(databasePath, databaseName)
  }
}

export default new StockRepository(path.resolve(__dirname, '..', 'database', 'database.json'), 'stocks')