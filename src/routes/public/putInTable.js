import { updateInTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {
  if (!req.body.id) {
    return res.json({
      "statusCode": 400,
      "message": "é necessário um id!"
    })
  }
  const sucessUpdate = await updateInTable(req, req.params.table)
  if (!sucessUpdate) {
    res.json({
      "statusCode": 400,
      "message": "item não existe"
    })
  } else {
    res.json({
      "statusCode": 201
    })
  }
}