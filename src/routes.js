import { Router } from "express";
import { createTable, insertInTable, selectTable, updateInTable, deleteInTable, selectInTable } from './Controler/sqliteQueries.js';

const router = Router();
router.post('/createTable', async (req, res) => {
  const nameOfTable = req.body.TableName
  if (nameOfTable) {
    await createTable(nameOfTable)
    res.json({
      "statusCode": 201
    })
  } else {
    res.json({
      "statusCode": 400
    })
  }
});

router.get('/:table', async (req, res) => {
  const table = await selectTable(req.params.table)
  if (table) {
    res.json(table)
  } else {
    res.json({
      "statusCode": 400,
      "message": "Tabela não existe"
    })
  }
})

router.get('/:table/:id', async (req, res) => {

  const item = await selectInTable(req, req.params.table)
  if (item) {
    res.json(item)
  } else {
    res.json({
      "statusCode": 400,
      "message": "item não encontrado"
    })
  }
})

router.post('/:table', async (req, res) => {
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
})

router.put('/:table', async (req, res) => {
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
})

router.delete('/:table', async (req, res) => {

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
})

export default router;