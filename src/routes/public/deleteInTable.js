import { deleteInTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {

  const sucessUpdate = await deleteInTable(req, req.params.table)
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