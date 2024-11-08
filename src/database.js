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

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push[data]
    } else {
      this.#database[table] = data
    }

    this.#persist()
    return data
  }
}
