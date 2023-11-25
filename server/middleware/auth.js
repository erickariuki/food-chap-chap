// auth.js
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

export default async function Auth(req, res, next) {
  try {
    // Check if the user is authenticated using a token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(403).json({ error: 'Access denied. No token provided.' });
    }

    // Verify the token
    jwt.verify(token, ENV.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token.' });
      }

      // Attach user information to the request
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Authentication Failed!' });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
