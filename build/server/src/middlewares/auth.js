import User from '../models/User.js';
import { Types } from 'mongoose';
import { verifyToken } from '../utils/jwt.js';

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
    }

    const decoded = verifyToken(token);

    const user = await User.findById(new Types.ObjectId(decoded.id)).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Người dùng không tồn tại' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Vui lòng đăng nhập để tiếp tục' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Bạn không có quyền truy cập. Yêu cầu quyền: ${roles.join(', ')}` 
      });
    }

    next();
  };
};