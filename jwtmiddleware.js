import JwtConfig from '../config/jwtConfig.js';
import JWT from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()
let checkToken = (req, res, next) => {
  let userToken = req.headers['authorization'];
  if (userToken) {
    // token value
    JWT.verify(
      userToken,
      process.env.JWT_SECRET,
      {
        algorithm: process.env.ALGORITHAM,
      },
      (error, data) => {
        if (error) {
          return res.status(401).json({
            message: 'Token is not valid',
            data: error,
          });
        } else {
          req.user = data;
          next();
        }
      }
    );
  } else {
    return res.status(401).json({
      message: 'Please provide authentication token value',
    });
  }
};

const JwtMiddleware = {
  checkToken: checkToken,
};

export default JwtMiddleware;