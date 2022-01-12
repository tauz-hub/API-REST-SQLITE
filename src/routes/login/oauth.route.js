import { openDbScret } from '../../secretDatabase/configSecretDB.js';
import crypto from "crypto"
import jwt from 'jsonwebtoken';
const { sign } = jwt;

export default {
  method: 'post',
  route: '/oauth',
  run: async (req, res) => {
    const { user, password } = req.body
    openDbScret().then(async db => {

      const tableExist = await db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='secret'")

      if (!tableExist) {
        return res.status(409).json("A Api não possui usuários registrados")
      }
      const instructionToGetItemTable = `SELECT * FROM secret WHERE user='${user}'`
      const userInDatabase = await db.get(instructionToGetItemTable)

      const hash = crypto.createHmac('sha512', process.env.CRYPTO_SALT);
      hash.update(password);
      const encryptedPassword = hash.digest('hex');

      if (!userInDatabase || userInDatabase.password !== encryptedPassword) {
        return res.status(400).json("login ou senha inválidos")
      }

      const token = sign({
        id: userInDatabase.id
      }, process.env.JWT_SALT, {
        expiresIn: "30m",
      })
      return res.status(200).json({
        token
      })
    })
  }
}