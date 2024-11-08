import fs from 'node:fs/promises'

const path = new URL('db.json', import.meta.url)

/** { "tasks": {...} } */
export class Database {
  #database = {}

  /** Construtor da base JSON */
  constructor() {
    fs.readFile(path, 'utf8')
      .then((data) => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  /** Gravando dados na base JSON */
  #persist() {
    fs.writeFile(path, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
    return data
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      const row = this.#database[table][rowIndex]
      this.#database[table][rowIndex] = { id, ...row, ...data }
      this.#persist()
    }
  }
}
