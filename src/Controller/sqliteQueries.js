import { openDb } from "../publicDatabase/configPublicDB.js";

export async function insertInTable(req) {
 const nameTable = req.params.table
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

export async function createTable(nameTable) {
  if (nameTable !== 'auth') {
    return openDb().then(async db => {
      const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
      const tableExist = await db.get(instructionToSelectTable)
      if (!tableExist) {
        const instructionToCreateTable = `CREATE TABLE IF NOT EXISTS ${nameTable} ( id TEXT PRIMARY KEY , data TEXT)`
        await db.exec(instructionToCreateTable)
        return true
      }
    })
  }
}

export async function deleteTable(nameTable) {
  if (nameTable !== 'auth') {
    return openDb().then(async db => {
      const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
      const tableExist = await db.get(instructionToSelectTable)
      if (tableExist) {
        const instructionToCreateTable = `DROP TABLE ${nameTable} `
        await db.run(instructionToCreateTable)
        return true
      }
    })
  }
}

export async function deleteInTable(req) {
  const nameTable = req.params.table
  return openDb().then(async db => {
    const instructionToSelectTable = `SELECT * FROM ${nameTable} WHERE id='${req.params.id}'`
    const itemExist = await db.get(instructionToSelectTable)
    if (itemExist) {
      const instructionToDeleteTable = `DELETE FROM ${nameTable} WHERE id='${req.params.id}'`
      db.get(instructionToDeleteTable)
      return true
    }
  })
}

export async function updateInTable(req) {
  const nameTable =  req.params.table
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

export async function selectInTable(req) {
  const nameTable = req.params.table
  return openDb().then(async db => {
    const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
    const tableExist = await db.get(instructionToSelectTable)
    if (tableExist) {
      const instructionToGetItemTable = `SELECT * FROM ${nameTable} WHERE id='${req.params.id}'`
      return db.get(instructionToGetItemTable)
    }
  })
}

export async function selectTable(req) {
  const nameTable = req.params.table
  return openDb().then(async db => {
    const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
    const tableExist = await db.get(instructionToSelectTable)
    if (tableExist) {
      const instructionToGetTable = `SELECT * FROM ${nameTable}`
      return db.all(instructionToGetTable).then(json => json)
    }
  });
}