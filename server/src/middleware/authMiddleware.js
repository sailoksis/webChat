import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: 'Нет токена авторизации' });

  const token = authHeader.split(' ')[1]; // Bearer token

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // передаем данные пользователя дальше
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};
