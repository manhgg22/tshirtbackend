import jwt from 'jsonwebtoken';

const JWT_SECRET = String(process.env.JWT_SECRET || 'your-secret-key');
const JWT_EXPIRES = '7d';

export const signToken = (id) => {
  try {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  } catch (error) {
    throw new Error('Token signing failed');
  }
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
};