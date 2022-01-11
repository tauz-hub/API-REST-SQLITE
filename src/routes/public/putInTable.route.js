import { updateInTable } from "../../Controller/sqliteQueries.js"
export default {
  method: "put",
  route: "/table/:table",
  isAuthenticated: true,
  permissions: ['discord', 'administrador'],
  run: async (req, res) => {
    if (!req.body.id) {
      return res.status(400).json("é necessário um id!")
    }
    const sucessUpdate = await updateInTable(req, req.params.table)
    if (!sucessUpdate) {
      return res.status(404).json("não encontrei o item")
    }
    return res.status(201).json("sucess")
  }
}