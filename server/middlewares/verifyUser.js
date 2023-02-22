const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config();

function verifyUser(req, res, next) {
  const token = req.headers.authorization.substring(7);

  if (!token) {
    res.status(401).json("Unauthorized");
  }

  try {
    const t = jwt.verify(token, process.env.TOKEN_KEY);
    next();
  } catch (e) {
    // console.log(e)
    res.status(401).json(e);
  }
}

module.exports = verifyUser