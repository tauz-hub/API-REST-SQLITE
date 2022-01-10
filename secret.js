import { openDbScret } from "./src/SecretDatabase/configSecretDB.js";

openDbScret().then(async db => {
  const userNew = {
    name: "matan",
    pwd: "matan12345",
    id: "34575%78723&&*12312"
  }


  const instructionToCreateTable = `CREATE TABLE IF NOT EXISTS gdqqjgta ( name TEXT PRIMARY KEY, pwd TEXT NOT NULL, id TEX NOT NULL UNIQUE )`
  db.exec(instructionToCreateTable)
  console.log(userNew.id)
  const instructionToInsertTable = `INSERT INTO gdqqjgta (name,pwd,id) VALUES ('${userNew.name}', '${userNew.pwd}','${userNew.id}')`
  db.run(instructionToInsertTable)

})