import { selectInTable } from "../../Controller/sqliteQueries.js"
export default {
  method: "get",
  route: "/table/:table/:id",
  authMiddleware: true,
  permissions: ['researcher', 'administrador'],
  run: async (req, res) => {

    const item = await selectInTable(req, req.params.table)
    if (item) {
      return res.status(200).json(item)
    }
    return res.status(404).json("Não encontrei o que você queria")
  }
}