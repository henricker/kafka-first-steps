import fs from 'fs/promises'

interface ISaveDatabaseProps {
  path: string
  databaseName: string
  database: Array<Object>
}

class ResolveDatabase {
  static async getDatabase(path: string) {
    const database = JSON.parse((await fs.readFile(path)).toString())
    return database
  }

  static async saveDatabase({ database, databaseName, path }: ISaveDatabaseProps) {
    const allData = JSON.parse((await fs.readFile(path)).toString())
    allData[databaseName] = database
    await fs.writeFile(path, JSON.stringify(allData, null, 2), {
      encoding: 'utf-8',
    })
  }
}

export default ResolveDatabase