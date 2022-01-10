import { deleteInTable } from "../../Controler/sqliteQueries.js"
export default async (req, res) => {

  const sucessUpdate = await deleteInTable(req, req.params.table)
  if (!sucessUpdate) {
    return res.status(404).json("não encontrei o item")
  }
  return res.status(201).json("sucess")

}