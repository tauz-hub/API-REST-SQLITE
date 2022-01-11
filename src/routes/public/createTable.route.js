import { createTable } from "../../Controler/sqliteQueries.js"
export default {
  method: "post",
  route: "/createTable",
  isAuthenticated: true,
  run: async (req, res) => {
    const nameOfTable = req.body.TableName
    if (nameOfTable) {
      if (await createTable(nameOfTable)) {
        return res.status(201).json("sucess")
      }
      return res.status(409).json("já existe uma tabela com este nome no banco")
    }
    return res.status(400).json("erro")
  }
}