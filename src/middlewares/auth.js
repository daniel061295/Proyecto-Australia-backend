import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config.js';

export const verityToken = (req, res, next) => {
  const token = req.cookies.access_token;
  req.session = { user: null };
  try {
    const data = jwt.verify(token, SECRET_JWT_KEY);
    req.session.user = data;
  } catch (err) { }
  next();
};

export const protectedEndPoint = (req, res, next) => {
  const user = req.session.user;
  if (!user) { return res.status(401).json({ message: 'Unauthorized' }); }
  next();
};
