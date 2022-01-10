import pkg from 'jsonwebtoken';
import { openDbScret } from '../../secretDatabase/configSecretDB.js';
const { sign } = pkg;
export const auth = async (req, res) => {
  const { user, password } = req.body
  openDbScret().then(async db => {
    const instructionToGetItemTable = `SELECT * FROM gdqqjgta WHERE name='${user}'`
    const userInDatabase = await db.get(instructionToGetItemTable)

    if (!userInDatabase || userInDatabase.pwd !== password) {
      return res.status(401).json({
        "erro": "login ou senha inválidos"
      })
    }

    const token = sign({
      id: userInDatabase.id
    }, process.env.JWT_SALT, {
      expiresIn: "10m",
    })
    return res.json({
      token
    })
  })
}