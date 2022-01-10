import { selectTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {
  const table = await selectTable(req.params.table)
  if (table) {
    return res.status(201).json(table)
  }
  return res.status(404).json("Não encontrei o que você queria")
}