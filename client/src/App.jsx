import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Chat from "./Chat.jsx";

function App() {
  return (
    <Router>
      <nav style={{ display: "flex", gap: 10, padding: 10 }}>
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
        <Link to="/chat">Чат</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
