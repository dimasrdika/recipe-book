import jwt from "jsonwebtoken";
import responseError from "../helpers/restResponse.helper.js";

const JWT_KEY = process.env.JWT_SECRET;

const middleware = (req, res, next) => {
  const token = req.headers.authorization;
  const access_token = token.split(" ")[1];

  if (!access_token) {
    return res.status(401).json(responseError("Access token is missing"));
  }

  jwt.verify(access_token, JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json(responseError("Invalid Access Token"));
    }
    req.userId = decoded.userId;
    next();
  });
};

export default { middleware };
