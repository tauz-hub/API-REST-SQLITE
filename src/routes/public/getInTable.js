import { selectInTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {

  const item = await selectInTable(req, req.params.table)
  if (item) {
    res.json(item)
  } else {
    res.json({
      "statusCode": 400,
      "message": "item não encontrado"
    })
  }
}