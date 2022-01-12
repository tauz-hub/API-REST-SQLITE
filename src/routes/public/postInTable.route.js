import { insertInTable } from "../../Controller/sqliteQueries.js"
export default {
  method: "post",
  route: "/table/:table",
  authMiddleware: true,
  permissions: ['discord', 'administrador'],
  run: async (req, res) => {
    if (!req.body.id || !req.body.data) {
      return res.status(400).send('é necessário um \"id\" e um \"data\"!')
    }
    const successInsert = await insertInTable(req, req.params.table)
    if (!successInsert) {
      return res.status(409).send("já existe um item com mesmo id na tabela!")
    }
    return res.status(201).send("success")
  }
}