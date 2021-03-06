import { createTable } from '../../Controller/sqliteQueries.js';

export default {
  method: 'post',
  route: '/createTable/:tablename',
  authMiddleware: true,
  permissions: ['administrador', 'master'],
  run: async (req, res) => {
    const nameOfTable = req.params.tablename;

    const regexLetters = /^[a-zA-Z0-9_]*$/;

    if (!regexLetters.test(nameOfTable)) {
      return res
        .status(409)
        .json(
          'Use apenas letras e números no nome da tabela (sem espaços, apenas _ )'
        );
    }
    const success = await createTable(nameOfTable);
    if (success) {
      return res.status(201).json('success');
    }
    return res.status(409).json('já existe uma tabela com este nome no banco');
  },
};
