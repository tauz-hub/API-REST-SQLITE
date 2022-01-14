import { deleteTable } from "../../Controller/sqliteQueries.js";
export default {
  method: "delete",
  route: "/deleteTable/:nametable",
  authMiddleware: true,
  permissions: ["administrador"],
  run: async (req, res) => {
    const regexLetters = /^[a-zA-Z0-9_]*$/;
    const nameOfTable = req.params.nametable

    if (!regexLetters.test(nameOfTable)) {
      return res
        .status(409)
        .json(
          "Use apenas letras e números no nome da tabela (sem espaços, apenas _ )"
        );
    }
    const success = await deleteTable(nameOfTable);
    if (success) {
      return res.status(201).json("success");
    }
    return res.status(409).json("não existe uma tabela com este nome no banco");
  },
};
