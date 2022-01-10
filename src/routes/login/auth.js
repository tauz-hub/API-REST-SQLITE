import pkg from 'jsonwebtoken';
import { openDbScret } from '../../secretDatabase/configSecretDB.js';
const { sign } = pkg;
export const auth = async (req, res) => {
  const { user, password } = req.body
  openDbScret().then(async db => {

    const instructionToSelectTable = `SELECT name FROM sqlite_master WHERE type='table' AND name='gdqqjgta'`
    const tableExist = await db.get(instructionToSelectTable)

    if (!tableExist) {
      return res.status(409).json("A Api não possui usuários registrados")
    }
    const instructionToGetItemTable = `SELECT * FROM gdqqjgta WHERE user='${user}'`

    const userInDatabase = await db.get(instructionToGetItemTable)

    if (!userInDatabase || userInDatabase.password !== password) {
      return res.status(400).json({
        "erro": "login ou senha inválidos"
      })
    }

    const token = sign({
      id: userInDatabase.id
    }, process.env.JWT_SALT, {
      expiresIn: "2d",
    })
    return res.json({
      token
    })
  })
}