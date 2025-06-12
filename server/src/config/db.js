import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/webChat');
    console.log('✅ Подключено к MongoDB');
  } catch (err) {
    console.error('❌ Ошибка подключения к MongoDB:', err);
    process.exit(1);
  }
};
