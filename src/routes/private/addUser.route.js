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
        return res.status(401).send('Token inválido');

      openDbScret().then(async db => {

        const userMaster = decoded.id === process.env.MASTERID ? decoded.id : null

        if (!userMaster) {
          return res.status(401).json("Unauthorized")
        }
        const { user, password, role } = req.body

        const rolesPermissions = ['researcher', 'administrador', 'master']

        if (!user || !password || !role) {
          return res.status(400).json({
            erro_message: "Cadastre um usuário com as seguintes informações",
            user: "",
            password: "",
            role: ""
          })
        }

        const tableExist = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='secret'")
        if (tableExist) {
          const instructionToGetItemTable = `SELECT * FROM secret WHERE user='${user}'`
          const userInDatabase = await db.get(instructionToGetItemTable)
          if (userInDatabase) {
            return res.status(409).json("Usuário já existe")
          }
        }

        if (!rolesPermissions.includes(role.toLowerCase())) {
          return res.status(400).json("envie uma role válida, ex: researcher, administrador ou master")
        }

        const hash = crypto.createHmac('sha512', process.env.CRYPTO_SALT);
        hash.update(password);
        const encryptedPassword = hash.digest('hex');

        const userNew = { user, password: encryptedPassword.toString(), id: uuidv4(), role: role.toLowerCase() }

        const instructionToCreateTable = `CREATE TABLE IF NOT EXISTS secret ( user TEXT PRIMARY KEY, password TEXT NOT NULL, id TEXT NOT NULL UNIQUE, role TEXT NOT NULL )`
        db.exec(instructionToCreateTable)

        const instructionToInsertTable = `INSERT INTO secret (user,password,id,role) VALUES ('${userNew.user}', '${userNew.password}','${userNew.id}','${userNew.role}')`
        db.run(instructionToInsertTable)
        return res.status(201).json("success")
      })
    });
  }
}