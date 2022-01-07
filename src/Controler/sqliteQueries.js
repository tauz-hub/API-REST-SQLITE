import { openDb } from "../configDB.js";

export async function insertInTable(req, nameTable) {
  let respost = true
  await openDb().then(async db => {
    const instructionToSelectInTable = `SELECT * FROM ${nameTable} WHERE id='${req.body.id}'`
    const itemExist = await db.get(instructionToSelectInTable)
    if (itemExist) {
      respost = false
    } else {
      const instructionToInsertTable = `INSERT INTO ${nameTable} (id,data) VALUES ('${req.body.id}', '${JSON.stringify(req.body.data)}')`
      db.run(instructionToInsertTable)
    }
  })
  return respost
}

export async function createTable(nameOfTable) {

  openDb().then(db => {
    const instructionToCreateTable = `CREATE TABLE IF NOT EXISTS ${nameOfTable} ( id TEXT PRIMARY KEY , data TEXT NOT NULL)`
    db.exec(instructionToCreateTable)
  })

}

export async function deleteInTable(req, nameTable) {
  let respost = true
  await openDb().then(async db => {
    const instructionToSelectTable = `SELECT * FROM ${nameTable} WHERE id='${req.body.id}'`
    const itemExist = await db.get(instructionToSelectTable)
    if (itemExist) {
      const instructionToDeleteTable = `DELETE FROM ${nameTable} WHERE id='${req.body.id}'`
      db.get(instructionToDeleteTable)
    } else {
      respost = false
    }
  })
  return respost
}

export async function updateInTable(req, nameTable) {
  let respost = true
  await openDb().then(async db => {
    const instructionToSelectTable = `SELECT * FROM ${nameTable} WHERE id='${req.body.id}'`
    const itemExist = await db.get(instructionToSelectTable)
    if (itemExist) {
      const instructionToUpdateTable = `UPDATE ${nameTable} SET data='${JSON.stringify(req.body.data)}' WHERE id='${req.body.id}'`
      db.run(instructionToUpdateTable)
    } else {
      respost = false
    }
  })
  return respost
}

export async function selectInTable(req, nameTable) {
  let item
  await openDb().then(async db => {
    const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
    const tableExist = await db.get(instructionToSelectTable)
    if (tableExist) {
      const instructionToGetItemTable = `SELECT * FROM ${nameTable} WHERE id='${req.params.id}'`
      item = await db.get(instructionToGetItemTable)
    }
  })
  return item
}

export async function selectTable(nameTable) {
  let jsonTable

  await openDb().then(async db => {
    const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='${nameTable}'`
    const tableExist = await db.get(instructionToSelectTable)
    if (tableExist) {
      const instructionToGetTable = `SELECT * FROM ${nameTable}`
      jsonTable = await db.all(instructionToGetTable).then(json => json)
    }
  });
  return jsonTable
}