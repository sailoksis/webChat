import './config.js';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { connectDB } from './config/db.js';
import roomRoutes from './routes/rooms.js';
import messageRoutes from './routes/messages.js';

console.log('JWT_SECRET:', process.env.JWT_SECRET);
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log(`⚡ Новый сокет: ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`Пользователь ${socket.id} вошел в комнату ${room}`);
  });

  socket.on('send_message', (data) => {
    io.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Сокет отключен: ${socket.id}`);
  });
});

const start = async () => {
  await connectDB(); // <-- вот это важно!
  server.listen(PORT, () => console.log(`🚀 Сервер работает на порту ${PORT}`));
};

start();
