import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                username,
                password,
            });

            // сохраняем токен
            localStorage.setItem('token', res.data.token);

            // переходим в чат
            navigate('/chat');
        } catch (err) {
            setError(err.response?.data?.message || 'Ошибка входа');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: 300, margin: '50px auto' }}>
            <h2>Вход</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Логин"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ marginBottom: 10, padding: 8 }}
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ marginBottom: 10, padding: 8 }}
                />
                <button type="submit" style={{ padding: 10 }}>Войти</button>
            </form>
        </div>
    );
}
