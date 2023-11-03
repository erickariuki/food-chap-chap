import jwt from 'jsonwebtoken';
import ENV from '../config.js'

/** auth middleware */
export default async function Auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ error: "Access denied." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ error: "Access denied." });
    }
    const parts = token.split('.');
    if (parts.length !== 3) {
      return res.status(403).json({ error: "Access denied." });
    }
    const decodedToken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedToken;
    console.log("Decoded Token:", decodedToken);
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Authentication Failed!" });
  }
}

export function localVariables(req, res, next){
  req.app.locals = {
    OTP : null,
    resetSession : false
  }
  next()
}
