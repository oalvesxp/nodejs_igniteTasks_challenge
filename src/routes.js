import { randomUUID } from 'crypto'
import { Database } from './database.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: '/tasks',
    handler: (req, res) => {
      /**
       * Buscar todas as tasks
       * Filtrar uma task por { title, decription }
       */
      return res.end('Buscando tasks')
    },
  },
  {
    method: 'POST',
    path: '/tasks',
    handler: (req, res) => {
      /**
       * Cria nova task
       * campos : { id, title, description, created_at, updated_at, completed_at }
       */
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
    path: '/tasks/:id',
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
    path: '/tasks/:id/complete',
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
    path: '/tasks/:id',
    handler: (req, res) => {
      /**
       * Deleta uma task
       * params: { id }
       */
      return res.end('Deletando task')
    },
  },
]
