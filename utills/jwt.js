const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const { ACCESS_KEY, REFRESH_KEY } = process.env;

module.exports = {
  createToken: (payload) => {
    const token = jwt.sign(
      {
        user_id: payload.toString()
      },
      ACCESS_KEY,
      {
        algorithm: "HS256",
        expiresIn: "30m",
      }
    );
    return token;
  },
  verifyToken: (token) => {
    if (!token) {
      return "";
    }
    let decoded = jwt.verify(token, ACCESS_KEY);
    return decoded;
  },

  createRefreshToken: (payload) => {
    const token = jwt.sign(
      {
        user_id: payload.toString(),
      },
      REFRESH_KEY,
      {
        algorithm: "HS256",
        expiresIn: "7d",
      }
    );
    return token;
  },
  verifyRefreshToken: (token) => {
    if (!token) {
      return "";
    }
    let decoded = jwt.verify(token, REFRESH_KEY);
    return decoded;
  },
};
