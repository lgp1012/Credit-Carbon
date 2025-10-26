import express from 'express';
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const registerUser = async (request, response) => {
    try {
    const { name, email, password } = request.body;
    const existing = await User.findOne({ email });
    if (existing) {
        return response.status(400).json({ message: 'Email này đã được đăng kí' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    response.status(201).json({ message: 'Đăng kí thành công', user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const loginUser = async (request, response) => {
  try {
    const {email, password} = request.body;

    // Check valid emal
    const user = await User.findOne({ email });
    if(!user) {
      return response.status(400).json({message: "Email không hợp lệ"});
    }

    // Check valid pass
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return response.status(400).json({message: "Mật khẩu không hợp lệ"});
    }
    const payload = { id: user._id, email: user.email };
    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign(payload, secret, { expiresIn: '7d' });

    return response.status(200).json({ message: "Đăng nhập thành công", token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    return response.status(500).json({message: "Đăng nhập không thành công"});
  }
}

export const forgotPassword = async (request, response) => {
  try {
    const { email, newPassword } = request.body;

    // Kiểm tra email
    const user = await User.findOne({ email });
    if (!user) return response.status(404).json({ message: 'Không tìm thấy người dùng với email này' });

    // Cập nhật mật khẩu mới
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    return response.status(200).json({ message: 'Đổi mật khẩu thành công' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Không thể đổi mật khẩu' });
  }
};

export const logout = async (request, response) => {
  try {
    return response.status(200).json({ message: 'Đăng xuất thành công' });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Lỗi khi đăng xuất' });
  }
};