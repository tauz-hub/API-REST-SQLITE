export default {
  name: "secret",
  method: 'get',
  route: '/secret',
  isAuthenticated: true,
  permissions: ['master'],
  run: async (req, res) => {
    res.send("autorizado!")
  }
}