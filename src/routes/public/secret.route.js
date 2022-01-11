export default {
  name: "secret",
  method: 'get',
  route: '/secret',
  isAuthenticated: true,
  permissions: ['administrador'],
  run: async (req, res) => {
    res.send("autorizado!")
  }
}