
import pkg from 'jsonwebtoken';
const { sign } = pkg;
export const auth = (req, res) => {
  const { user, password } = req.body
  //checage, no banco
  const token = sign({
    user, password
  }, process.env.JWT_SALT, {
    expiresIn: 120,
  })
  res.json({
    token
  })
}