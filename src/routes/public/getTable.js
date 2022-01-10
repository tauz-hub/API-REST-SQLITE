import { selectTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {
  const table = await selectTable(req.params.table)
  if (table) {
    res.status(201).json(table)
  } else {
    res.status(400).json({
      "message": "Tabela não existe"
    })
  }
}