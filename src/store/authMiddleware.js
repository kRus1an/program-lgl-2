// Строка 1: Импортирую actions из authSlice
import { authStart, registerSuccess, loginSuccess, authFailure } from './authSlice';

// Строки 3-8: Создаю типы действий для middleware
// Эти действия будут перехватываться middleware
export const REGISTER_REQUEST = 'auth/registerRequest';
export const LOGIN_REQUEST = 'auth/loginRequest';

// Строки 10-100: Middleware для обработки авторизации
// Middleware - это функция, которая перехватывает actions перед тем как они попадут в reducer
const authMiddleware = (store) => (next) => (action) => {
  
  // Строки 14-60: Обработка регистрации
  if (action.type === REGISTER_REQUEST) {
    // Получаю данные из action
    const { email, password, name, age } = action.payload;
    
    // Строки 19-24: Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      store.dispatch(authFailure('Некорректный email адрес'));
      return;
    }
    
    // Строки 26-31: Валидация пароля (минимум 6 символов)
    if (password.length < 6) {
      store.dispatch(authFailure('Пароль должен содержать минимум 6 символов'));
      return;
    }
    
    // Строки 33-38: Валидация имени
    if (!name || name.trim().length < 2) {
      store.dispatch(authFailure('Имя должно содержать минимум 2 символа'));
      return;
    }
    
    // Строки 40-45: Валидация возраста
    if (!age || age < 1 || age > 120) {
      store.dispatch(authFailure('Возраст должен быть от 1 до 120 лет'));
      return;
    }
    
    // Строки 47-51: Имитация задержки сети (асинхронная операция)
    store.dispatch(authStart());
    
    setTimeout(() => {
      // Если все проверки пройдены - регистрирую пользователя
      store.dispatch(registerSuccess({ email, password, name, age }));
    }, 500);  // Задержка 0.5 секунды
    
    return;
  }
  
  // Строки 62-95: Обработка входа
  if (action.type === LOGIN_REQUEST) {
    // Получаю данные из action
    const { email, password } = action.payload;
    
    // Строки 67-72: Валидация email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      store.dispatch(authFailure('Некорректный email адрес'));
      return;
    }
    
    // Строки 74-79: Валидация пароля
    if (!password || password.length < 6) {
      store.dispatch(authFailure('Пароль должен содержать минимум 6 символов'));
      return;
    }
    
    // Строки 81-85: Имитация задержки сети
    store.dispatch(authStart());
    
    setTimeout(() => {
      // Если все проверки пройдены - пытаюсь войти
      store.dispatch(loginSuccess({ email, password }));
    }, 500);  // Задержка 0.5 секунды
    
    return;
  }
  
  // Строки 97-99: Пропускаю action дальше к reducer
  return next(action);
};

// Строка 102: Экспортирую middleware
export default authMiddleware;
