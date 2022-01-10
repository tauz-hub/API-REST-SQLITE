import { insertInTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {
  if (!req.body.id || !req.body.data) {
    return res.status(400).json("é necessário um \"id\" e um \"data\"!")
  }
  const sucessInsert = await insertInTable(req, req.params.table)
  if (!sucessInsert) {
    return res.status(409).json("já existe um item com mesmo id na tabela!")
  }
  return res.status(201).json("sucess")
}