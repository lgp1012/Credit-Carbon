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
    return response.status(201).json({message: "Đăng nhập thành công"});
  } catch (error) {
    return response.status(500).json({message: "Đăng nhập không thành công"});
  }
}