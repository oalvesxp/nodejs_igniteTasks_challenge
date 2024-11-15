import { randomUUID } from 'crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route.path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query
      const tasks = database.select(
        'tasks',
        search
          ? {
              title: search,
              description: search,
            }
          : null
      )

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
        .end(JSON.stringify({ message: 'Created', id: task.id }))
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description)
        return res.writeHead(400).end(
          JSON.stringify({
            error: 'Bad Request',
            message: 'Title or Description are required',
          })
        )

      /** Verifica se a task existe */
      const [task] = database.select('tasks', { id })

      if (!task)
        return res
          .writeHead(404)
          .end(
            JSON.stringify({ error: 'Not Found', message: 'No tasks founded' })
          )

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date(),
      })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const [task] = database.select('tasks', { id })

      if (!task)
        return res
          .writeHead(404)
          .end(
            JSON.stringify({ error: 'Not Found', message: 'No tasks founded' })
          )

      const isCompleted = !!task.completed_at
      const completed_at = isCompleted ? null : new Date()

      database.update('tasks', id, { completed_at })

      return res.writeHead(204).end()
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const [task] = database.select('tasks', { id })

      if (!task)
        return res
          .writeHead(404)
          .end(
            JSON.stringify({ error: 'Not Found', message: 'No tasks founded' })
          )

      database.delete('tasks', id)

      return res.writeHead(204).end()
    },
  },
]
