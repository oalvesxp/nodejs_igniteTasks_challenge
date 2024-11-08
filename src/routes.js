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
      return res.end('Salvando task')
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
