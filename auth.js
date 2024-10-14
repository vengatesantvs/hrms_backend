const jwt = require('jsonwebtoken');
const secretkey="13thhhhjuj"
const generateToken = (userId) => {
  return jwt.sign({ userId }, secretkey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, secretkey);
};

module.exports = { generateToken, verifyToken };
