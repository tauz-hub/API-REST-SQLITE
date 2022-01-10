import { insertInTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {
  if (!req.body.id) {
    return res.json({
      "statusCode": 400,
      "message": "é necessário um id!"
    })
  }
  const sucessInsert = await insertInTable(req, req.params.table)
  if (!sucessInsert) {
    res.json({
      "statusCode": 400,
      "message": "item já está criado"
    })
  } else {
    res.json({
      "statusCode": 201
    })
  }
}