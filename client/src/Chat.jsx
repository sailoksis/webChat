import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // адрес твоего сервера

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const messageData = {
      room: 'general',
      author: 'User', // пока статично
      message,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit('send_message', messageData);
    setMessages((prev) => [...prev, messageData]);
    setMessage('');
  };

  return (
    <div>
      <h2>Онлайн чат (комната "general")</h2>
      <div
        style={{
          border: '1px solid #ccc',
          padding: 10,
          height: 300,
          overflowY: 'scroll',
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.author}</b> [{msg.time}]: {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Введите сообщение"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Отправить</button>
    </div>
  );
};

export default Chat;
