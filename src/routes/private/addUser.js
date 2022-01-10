import { openDbScret } from "../../SecretDatabase/configSecretDB.js";
import pkg from 'jsonwebtoken';
const { verify } = pkg;
export default (req, res) => {

  const token = req.headers.authorization?.replace("Bearer ", '')
  verify(token, process.env.JWT_SALT, (err, decoded) => {
    if (err)
      return res.status(401).send('Token inválido, gere um novo');

    openDbScret().then(async db => {

      const userMaster = decoded.id === process.env.MASTERID ? decoded.id : null

      if (!userMaster) {
        return res.status(401).json("Unauthorized")
      }
      const { user, password, id } = req.body
      if (!user || !password || !id) {
        return res.status(400).json("erro, adicione um body válido: { user : \"\", password:\"\", id: \"\"}")
      }

      const userNew = { user, password, id }

      const instructionToCreateTable = `CREATE TABLE IF NOT EXISTS gdqqjgta ( user TEXT PRIMARY KEY, password TEXT NOT NULL, id TEX NOT NULL UNIQUE )`
      db.exec(instructionToCreateTable)

      const instructionToInsertTable = `INSERT INTO gdqqjgta (user,password,id) VALUES ('${userNew.user}', '${userNew.password}','${userNew.id}')`
      db.run(instructionToInsertTable)
      return res.status(201).json("sucess")
    })
  });
}