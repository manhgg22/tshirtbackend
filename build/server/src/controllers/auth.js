import User from '../models/User.js';
import { signToken, verifyToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

const sanitizeUser = (user) => {
  const { password, __v, ...rest } = user.toObject();
  return rest;
};

// POST /api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ name, email, password' });
    }

    const existed = await User.findOne({ email: email.toLowerCase() });
    if (existed) return res.status(409).json({ message: 'Email đã được sử dụng' });

    // Check if phone already exists (if provided)
    if (phone) {
      const phoneExisted = await User.findOne({ phone });
      if (phoneExisted) return res.status(409).json({ message: 'Số điện thoại đã được sử dụng' });
    }

    const user = await User.create({ name, email, password, phone, role });
    const token = signToken(user._id.toString());

    return res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
};

// POST /api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu1' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });

    const token = signToken(user._id.toString());

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi máy chủ', error: err.message });
  }
};

// GET /api/auth/profile
export const getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Token không được cung cấp' });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).populate('addresses');
    
    if (!user) {
      return res.status(404).json({ message: 'Người dùng không tồn tại' });
    }

    return res.status(200).json(sanitizeUser(user));
  } catch (err) {
    return res.status(401).json({ message: 'Token không hợp lệ', error: err.message });
  }
};