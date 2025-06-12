import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // импорт модели

const router = express.Router();
const SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', process.env.JWT_SECRET);
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id, username }, SECRET);
    res.json({ token });
  } catch (err) {
    console.error('Ошибка регистрации:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
console.log('JWT_SECRET:', process.env.JWT_SECRET);
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, username }, SECRET);
    res.json({ token });
  } catch (err) {
    console.error('Ошибка входа:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
