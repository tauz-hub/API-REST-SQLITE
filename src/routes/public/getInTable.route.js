import { selectInTable } from "../../Controler/sqliteQueries.js"
export default {
  method: "get",
  route: "/table/:table/:id",
  isAuthenticated: true,
  run: async (req, res) => {

    const item = await selectInTable(req, req.params.table)
    if (item) {
      return res.json(item)
    }
    return res.status(404).json("Não encontrei o que você queria")
  }
}