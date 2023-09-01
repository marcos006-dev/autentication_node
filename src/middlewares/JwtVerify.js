import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const keyPrivateKey = process.env.SECRET;
    const decoded = jwt.verify(token, keyPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'No autorizado' });
  }
};
