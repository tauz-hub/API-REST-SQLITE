import pkg from 'jsonwebtoken';
import { openDbScret } from '../secretDatabase/configSecretDB.js';
const { verify } = pkg;

export const isAuthenticated = (req, res, next) => {

  const token = req.headers.authorization?.replace("Bearer ", '')
  verify(token, process.env.JWT_SALT, (err, decoded) => {
    if (err)
      return res.status(401).send('Token inválido, tá querendo acessar o que espertinho?');

    openDbScret().then(async db => {
      const instructionToGetItemTable = `SELECT * FROM gdqqjgta WHERE id='${decoded.id}'`
      const userInDatabase = await db.get(instructionToGetItemTable)

      if (!userInDatabase) {
        return res.status(401).json("Unauthorized")
      }
      req['tokenData'] = userInDatabase;
      next()
    })
  });
}