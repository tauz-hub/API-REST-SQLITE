import { deleteInTable } from "../../Controller/sqliteQueries.js"
export default {
  method: "delete",
  route: "/table/:table",
  authMiddleware: true,
  permissions: ['discord', 'administrador'],
  run: async (req, res) => {
    const successUpdate = await deleteInTable(req, req.params.table)
    if (!successUpdate) {
      return res.status(404).json("não encontrei o item")
    }
    return res.status(201).json("success")
  }
}