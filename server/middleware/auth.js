// Auth.js
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

export default async function Auth(req, res, next) {
  try {
    // Check if the user is authenticated using Passport session
    if (!req.isAuthenticated()) {
      return res.status(403).json({ error: 'Access denied.' });
    }

    // You can still access user information using req.user
    console.log('Authenticated User:', req.user);

    next();
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
