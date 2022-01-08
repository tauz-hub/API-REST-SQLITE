import pkg from 'jsonwebtoken';
const { verify } = pkg;
export const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", '')
    const validToken = verify(token, process.env.JWT_SALT);
    req['tokenData'] = validToken;
    next()
  } catch (e) {
    res.status(401).json("Unauthorized")
  }
}