import { updateInTable } from "../../Controller/sqliteQueries.js"
export default {
  method: "put",
  route: "/table/:table",
  authMiddleware: true,
  permissions: ['discord', 'administrador'],
  run: async (req, res) => {
    if (!req.body.id) {
      return res.status(400).send("é necessário um id!")
    }
    const successUpdate = await updateInTable(req)
    if (!successUpdate) {
      return res.status(404).send("não encontrei o item")
    }
    return res.status(201).send("success")
  }
}