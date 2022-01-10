import { createTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {
  const nameOfTable = req.body.TableName
  if (nameOfTable) {
    if (await createTable(nameOfTable)) {
      return res.status(201).json("sucess")
    }
  }
  return res.status(400).json("erro")
}