import crypto from "crypto"
import { openDbScret } from "../../SecretDatabase/configSecretDB.js";
import jwt from 'jsonwebtoken';
const { verify } = jwt;
import { v4 as uuidv4 } from 'uuid';

export default {
  method: 'post',
  route: '/addUser',
  run: (req, res) => {

    const token = req.headers.authorization?.replace("Bearer ", '')
    verify(token, process.env.JWT_SALT, (err, decoded) => {
      if (err)
        return res.status(401).send('Token inválido, gere um novo');

      openDbScret().then(async db => {

        const userMaster = decoded.id === process.env.MASTERID ? decoded.id : null

        if (!userMaster) {
          return res.status(401).json("Unauthorized")
        }
        const { user, password } = req.body
        if (!user || !password) {
          return res.status(400).json("erro, adicione um body válido: { user : \"\", password:\"\"}")
        }

        const instructionToGetItemTable = `SELECT * FROM secret WHERE user='${user}'`
        const userInDatabase = await db.get(instructionToGetItemTable)
        if (userInDatabase) {
          return res.status(409).json("Usuário já existe")
        }


        const hash = crypto.createHmac('sha512', process.env.CRYPTO_SALT);
        hash.update(password);
        const encryptedPassword = hash.digest('hex');

        console.log(encryptedPassword)

        const userNew = { user, password: encryptedPassword, id: uuidv4() }

        const instructionToCreateTable = `CREATE TABLE IF NOT EXISTS secret ( user TEXT PRIMARY KEY, password TEXT NOT NULL, id TEXT NOT NULL UNIQUE )`
        db.exec(instructionToCreateTable)

        const instructionToInsertTable = `INSERT INTO secret (user,password,id) VALUES ('${userNew.user}', '${encryptedPassword.toString()}','${userNew.id}')`
        db.run(instructionToInsertTable)
        return res.status(201).json("sucess")
      })
    });
  }
}