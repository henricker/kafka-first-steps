import ResolveDatabase from "./resolve-database"

class Repository<T> {
  constructor(protected databasePath: string, protected databaseName: string) {}

  async findById(id: string): Promise<T> {
    const database = await ResolveDatabase.getDatabase(this.databasePath)  
    const rowBody = database.stocks.find((rowBody: T) => rowBody['id'] === id)
    return rowBody
  }

  async create(rowBody: T): Promise<T> {
    const database = await ResolveDatabase.getDatabase(this.databasePath)
    database[this.databaseName].push(rowBody)
    await ResolveDatabase.saveDatabase({ 
      path: this.databasePath, 
      databaseName: this.databaseName, 
      database: database[this.databaseName]
    })
    return rowBody
  }

  async delete(id: string) {
    let database = await ResolveDatabase.getDatabase(this.databasePath)
    database[this.databaseName] = database[this.databaseName].filter((rowBody: T) => rowBody['id'] !== id)
    await ResolveDatabase.saveDatabase({ path: this.databasePath, database: database[this.databaseName], databaseName: this.databaseName })
  }

  async findAll(): Promise<T[]> {
    return await ResolveDatabase.getDatabase(this.databasePath)
  }
}

export default Repository