// Строка 1: Импортирую React и хуки
import React, { useState, useEffect } from 'react';
// Строка 3: Импортирую хуки Redux
import { useSelector, useDispatch } from 'react-redux';
// Строка 5: Импортирую хуки для навигации
import { useNavigate, Link } from 'react-router-dom';
// Строка 7: Импортирую motion для анимаций
import { motion } from 'framer-motion';
// Строка 9: Импортирую action и тип для регистрации
import { REGISTER_REQUEST } from '../store/authMiddleware';
import { clearError } from '../store/authSlice';
// Строка 12: Импортирую стили
import './Auth.css';

// Строка 14: Создаю компонент регистрации
function Register() {
  // Строки 16-21: Локальное состояние для формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
  });

  // Строки 24-26: Получаю данные из Redux
  const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Строки 29-35: Если пользователь уже авторизован - перенаправляю на главную
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Строки 37-42: Очищаю ошибку при размонтировании компонента
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Строки 44-49: Обработчик изменения полей формы
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Строки 51-75: Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Валидация: проверяю, что все поля заполнены
    if (!formData.email || !formData.password || !formData.name || !formData.age) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    // Валидация: проверяю, что пароли совпадают
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    // Отправляю action в middleware для регистрации
    // Middleware перехватит этот action и выполнит валидацию
    dispatch({
      type: REGISTER_REQUEST,
      payload: {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        age: parseInt(formData.age)
      }
    });
  };

  // Строки 77-250: Возвращаю JSX разметку
  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Строки 87-90: Заголовок страницы */}
        <div className="auth-header">
          <h1>📝 Регистрация</h1>
          <p>Создайте аккаунт для доступа ко всем функциям</p>
        </div>

        {/* Строки 92-95: Отображение ошибки */}
        {error && (
          <motion.div 
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {error}
          </motion.div>
        )}

        {/* Строки 102-200: Форма регистрации */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Строки 104-115: Поле "Email" */}
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

          {/* Строки 117-128: Поле "Имя" */}
          <div className="form-group">
            <label htmlFor="name">Имя *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Введите ваше имя"
              required
              disabled={loading}
            />
          </div>

          {/* Строки 130-142: Поле "Возраст" */}
          <div className="form-group">
            <label htmlFor="age">Возраст *</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Введите ваш возраст"
              min="1"
              max="120"
              required
              disabled={loading}
            />
          </div>

          {/* Строки 144-155: Поле "Пароль" */}
          <div className="form-group">
            <label htmlFor="password">Пароль *</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
              required
              disabled={loading}
            />
          </div>

          {/* Строки 157-168: Поле "Подтверждение пароля" */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Подтвердите пароль *</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              required
              disabled={loading}
            />
          </div>

          {/* Строки 170-180: Кнопка регистрации */}
          <motion.button
            type="submit"
            className="auth-button"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? 'Регистрация...' : '✅ Зарегистрироваться'}
          </motion.button>
        </form>

        {/* Строки 187-195: Ссылка на страницу входа */}
        <div className="auth-footer">
          <p>Уже есть аккаунт?</p>
          <Link to="/login">
            <motion.button
              className="link-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Войти
            </motion.button>
          </Link>
        </div>

        {/* Строки 202-210: Кнопка "На главную" */}
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

export default Register;
