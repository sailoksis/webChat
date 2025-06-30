import express from 'express';
import Room from '../models/Room.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Создать комнату
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;

  try {
    const existing = await Room.findOne({ name });
    if (existing)
      return res.status(400).json({ message: 'Комната уже существует' });

    const room = await Room.create({ name });
    res.json(room);
  } catch (err) {
    console.error('Ошибка при создании комнаты:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Получить все комнаты
router.get('/', authMiddleware, async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.json(rooms);
  } catch (err) {
    console.error('Ошибка при получении комнат:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
