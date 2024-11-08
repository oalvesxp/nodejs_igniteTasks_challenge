import { randomUUID } from 'crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route.path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      /**
       * Filtrar uma task por { title, decription }
       */
      const tasks = database.select('tasks')
      return res.writeHead(200).end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { title, description } = req.body

      /** { title } e { description } => required */
      if (!title)
        return res.writeHead(400).end(
          JSON.stringify({
            error: 'Bad Request',
            message: 'Title is required',
          })
        )

      if (!description)
        return res.writeHead(400).end(
          JSON.stringify({
            error: 'Bad Request',
            message: 'Description is required',
          })
        )

      const task = {
        id: randomUUID(),
        title,
        description,
        created_at: new Date(),
        updated_at: new Date(),
        completed_at: null,
      }

      database.insert('tasks', task)

      return res
        .writeHead(201)
        .end(JSON.stringify({ message: 'Success', id: task.id }))
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      /**
       * Atualiza as informações de uma task
       * Params : { id }
       * Request body: [{ title? }, { description? }]
       */
      return res.end('Atualizando task')
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      /**
       * Marca a task como "completed_at"
       * Params: { id }
       */
      return res.end('Task completa')
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      /**
       * Deleta uma task
       * params: { id }
       */
      return res.end('Deletando task')
    },
  },
]
