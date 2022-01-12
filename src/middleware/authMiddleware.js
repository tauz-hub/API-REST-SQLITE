import pkg from 'jsonwebtoken';
import { openDbScret } from '../secretDatabase/configSecretDB.js';
const { verify } = pkg;

export default (req, res, next) => {

  const token = req.headers.authorization?.replace("Bearer ", '')

  verify(token, process.env.JWT_SALT, (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    if (decoded.id === process.env.MASTERID) {
      req['tokenData'] = { role: 'master' }
      return next()
    }

    openDbScret().then(async db => {
      const instructionToGetItemTable = `SELECT * FROM secret WHERE id='${decoded.id}'`
      const userInDatabase = await db.get(instructionToGetItemTable)

      if (!userInDatabase) {
        return res.status(401).json("Unauthorized")
      }
      const tokenData = { user: userInDatabase.user, id: userInDatabase.id, role: userInDatabase.role }

      req['tokenData'] = tokenData;
      return next()
    })
  });
}