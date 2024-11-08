export const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (req, res) => {
      return res.end('Hello world!')
    },
  },
]
