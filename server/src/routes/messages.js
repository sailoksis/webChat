import express from 'express';
import Message from '../models/Message.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Получить все сообщения в комнате
router.get('/:roomId', authMiddleware, async (req, res) => {
  const { roomId } = req.params;

  try {
    const messages = await Message.find({ room: roomId }).sort({
      createdAt: 1,
    });
    res.json(messages);
  } catch (err) {
    console.error('Ошибка при получении сообщений:', err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

export default router;
