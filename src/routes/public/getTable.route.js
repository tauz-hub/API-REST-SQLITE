import { selectTable } from "../../Controller/sqliteQueries.js"
export default {
  method: "get",
  route: "/table/:table",
  isAuthenticated: true,
  permissions: ['researcher', 'administrador'],
  run: async (req, res) => {
    const table = await selectTable(req.params.table)
    if (table) {
      return res.status(201).json(table)
    }
    return res.status(404).json("Não encontrei o que você queria")
  }
}