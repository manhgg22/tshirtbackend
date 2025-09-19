import { Request, Response } from 'express';
import User from '../models/User';
import { signToken } from '../utils/jwt';
import bcrypt from 'bcryptjs';

const sanitizeUser = (user: any) => {
  const { password, __v, ...rest } = user.toObject();
  return rest;
};

// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đủ name, email, password' });
    }

    const existed = await User.findOne({ email: email.toLowerCase() });
    if (existed) return res.status(409).json({ message: 'Email đã được sử dụng' });

    const user = await User.create({ name, email, password, role });
    const token = signToken(user._id.toString());

    return res.status(201).json({
      message: 'Đăng ký thành công',
      token,
      user: sanitizeUser(user),
    });
  } catch (err) {
    return res.status(500).json({ message: 'Lỗi máy chủ', error: (err as Error).message });
  }
};

// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
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
    return res.status(500).json({ message: 'Lỗi máy chủ', error: (err as Error).message });
  }
};
