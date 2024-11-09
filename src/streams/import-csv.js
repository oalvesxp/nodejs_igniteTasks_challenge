import { parse } from 'csv-parse'
import fs from 'node:fs'

const path = new URL('./tasks.csv', import.meta.url)
const stream = fs.createReadStream(path)

/** Configurações do parse CSV */
const parser = parse({
  delimiter: ',',
  skip_empty_lines: true,
  from_line: 2,
})

async function run() {
  const lines = stream.pipe(parser)

  for await (const line of lines) {
    const [title, description] = line /** Extraindo dados da linha do CSV */

    /** Enviando dados para o endpoint */
    await fetch('http:localhost:9080/tasks', {
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })

    await wait(400)
  }
}

run() /** Executando o import */

function wait(ms) {
  return new Promise((res) => setTimeout(res, ms))
}
