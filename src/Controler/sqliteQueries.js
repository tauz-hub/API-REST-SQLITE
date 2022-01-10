import { openDb } from "../publicDatabase/configPublicDB.js";

export async function insertInTable(req, nameTable) {
  return openDb().then(async db => {
    const instructionToSelectInTable = `SELECT * FROM ${nameTable} WHERE id='${req.body.id}'`
    const itemExist = await db.get(instructionToSelectInTable)
    if (!itemExist) {
      const instructionToInsertTable = `INSERT INTO ${nameTable} (id,data) VALUES ('${req.body.id}', '${JSON.stringify(req.body.data)}')`
      db.run(instructionToInsertTable)
      return true
    }
  })
}

export async function createTable(nameOfTable) {
  if (nameOfTable !== 'auth') {
    return openDb().then(db => {
      const instructionToCreateTable = `CREATE TABLE IF NOT EXISTS ${nameOfTable} ( id TEXT PRIMARY KEY , data TEXT)`
      db.exec(instructionToCreateTable)
      return true
    })
  }
}

export async function deleteInTable(req, nameTable) {
  return openDb().then(async db => {
    const instructionToSelectTable = `SELECT * FROM ${nameTable} WHERE id='${req.body.id}'`
    const itemExist = await db.get(instructionToSelectTable)
    if (itemExist) {
      const instructionToDeleteTable = `DELETE FROM ${nameTable} WHERE id='${req.body.id}'`
      db.get(instructionToDeleteTable)
      return true
    }
  })
}

export async function updateInTable(req, nameTable) {
  return openDb().then(async db => {
    const instructionToSelectTable = `SELECT * FROM ${nameTable} WHERE id='${req.body.id}'`
    const itemExist = await db.get(instructionToSelectTable)
    if (itemExist) {
      const instructionToUpdateTable = `UPDATE ${nameTable} SET data='${JSON.stringify(req.body.data)}' WHERE id='${req.body.id}'`
      db.run(instructionToUpdateTable)
      return true
    }
  })
}

export async function selectInTable(req, nameTable) {
  return openDb().then(async db => {
    const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
    const tableExist = await db.get(instructionToSelectTable)
    if (tableExist) {
      const instructionToGetItemTable = `SELECT * FROM ${nameTable} WHERE id='${req.params.id}'`
      return db.get(instructionToGetItemTable)
    }
  })
}

export async function selectTable(nameTable) {
  return openDb().then(async db => {
    const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
    const tableExist = await db.get(instructionToSelectTable)
    if (tableExist) {
      const instructionToGetTable = `SELECT * FROM ${nameTable}`
      return db.all(instructionToGetTable).then(json => json)
    }
  });
}