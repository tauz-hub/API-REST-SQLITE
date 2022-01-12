export default {
  name: "secret",
  method: 'get',
  route: '/secret',
  authMiddleware: true,
  permissions: ['administrador'],
  run: async (req, res) => {
    res.send("autorizado!")
  }
}