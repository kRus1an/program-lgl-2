// Строка 1: Импортирую React и хуки
import React, { useState, useEffect } from 'react';
// Строка 3: Импортирую хуки Redux
import { useSelector, useDispatch } from 'react-redux';
// Строка 5: Импортирую хуки для навигации
import { useNavigate, Link } from 'react-router-dom';
// Строка 7: Импортирую motion для анимаций
import { motion } from 'framer-motion';
// Строка 9: Импортирую action и тип для входа
import { LOGIN_REQUEST } from '../store/authMiddleware';
import { clearError } from '../store/authSlice';
// Строка 12: Импортирую стили
import './Auth.css';

// Строка 14: Создаю компонент входа
function Login() {
  // Строки 16-19: Локальное состояние для формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Строки 22-24: Получаю данные из Redux
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Строки 27-33: Если пользователь уже авторизован - перенаправляю на главную
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Строки 35-40: Очищаю ошибку при размонтировании компонента
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Строки 42-47: Обработчик изменения полей формы
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Строки 49-65: Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация: проверяю, что все поля заполнены
    if (!formData.email || !formData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    // Отправляю action в middleware для входа
    // Middleware перехватит этот action и выполнит валидацию
    dispatch({
      type: LOGIN_REQUEST,
      payload: {
        email: formData.email,
        password: formData.password
      }
    });
  };

  // Строки 67-200: Возвращаю JSX разметку
  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Строки 77-80: Заголовок страницы */}
        <div className="auth-header">
          <h1>🔐 Вход</h1>
          <p>Войдите в свой аккаунт</p>
        </div>

        {/* Строки 82-85: Отображение ошибки */}
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Строки 92-140: Форма входа */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Строки 94-105: Поле "Email" */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              required
              disabled={loading}
            />
          </div>

          {/* Строки 107-118: Поле "Пароль" */}
          <div className="form-group">
            <label htmlFor="password">Пароль *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
              disabled={loading}
            />
          </div>

          {/* Строки 120-130: Кнопка входа */}
          <motion.button
            type="submit"
            className="auth-button"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? 'Вход...' : '🔓 Войти'}
          </motion.button>
        </form>

        {/* Строки 137-145: Ссылка на страницу регистрации */}
        <div className="auth-footer">
          <p>Нет аккаунта?</p>
          <Link to="/register">
            <motion.button
              className="link-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Зарегистрироваться
            </motion.button>
          </Link>
        </div>

        {/* Строки 152-160: Кнопка "На главную" */}
        <div className="auth-footer">
          <Link to="/">
            <motion.button
              className="back-to-home-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ← На главную
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
