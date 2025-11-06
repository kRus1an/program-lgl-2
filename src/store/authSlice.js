// Строка 1: Импортирую функцию для создания slice
import { createSlice } from '@reduxjs/toolkit';

// Строки 4-10: Начальное состояние для авторизации
const initialState = {
  user: null,           // Текущий пользователь (null если не авторизован)
  users: [],            // Список всех зарегистрированных пользователей
  isAuthenticated: false,  // Авторизован ли пользователь
  error: null,          // Ошибка при входе/регистрации
  loading: false,       // Идет ли процесс авторизации
};

// Строки 12-120: Создаю slice для управления авторизацией
const authSlice = createSlice({
  name: 'auth',  // Имя slice
  initialState,  // Начальное состояние
  
  // Строки 17-119: Reducers - функции для изменения состояния
  reducers: {
    // Строки 19-24: Начало процесса авторизации
    // Устанавливаю loading в true, очищаю ошибки
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    
    // Строки 26-47: Регистрация нового пользователя
    // Вызывается из middleware после проверки данных
    registerSuccess: (state, action) => {
      const { email, password, name, age } = action.payload;
      
      // Проверяю, не зарегистрирован ли уже пользователь с таким email
      const existingUser = state.users.find(user => user.email === email);
      
      if (existingUser) {
        state.error = 'Пользователь с таким email уже существует';
        state.loading = false;
        return;
      }
      
      // Создаю нового пользователя
      const newUser = {
        id: Date.now(),  // Уникальный ID
        email,
        password,  // В реальном приложении пароль нужно хешировать!
        name,
        age,
        registeredAt: new Date().toISOString(),
      };
      
      // Добавляю пользователя в список
      state.users.push(newUser);
      
      // Автоматически авторизую пользователя после регистрации
      state.user = { id: newUser.id, email: newUser.email, name: newUser.name, age: newUser.age };
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      // Сохраняю в localStorage для сохранения сессии
      localStorage.setItem('currentUser', JSON.stringify(state.user));
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    
    // Строки 49-75: Вход пользователя
    // Вызывается из middleware после проверки логина и пароля
    loginSuccess: (state, action) => {
      const { email, password } = action.payload;
      
      // Ищу пользователя с таким email и паролем
      const user = state.users.find(
        u => u.email === email && u.password === password
      );
      
      if (!user) {
        state.error = 'Неверный email или пароль';
        state.loading = false;
        return;
      }
      
      // Авторизую пользователя
      state.user = { id: user.id, email: user.email, name: user.name, age: user.age };
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      
      // Сохраняю в localStorage
      localStorage.setItem('currentUser', JSON.stringify(state.user));
    },
    
    // Строки 77-86: Выход пользователя
    // Очищаю данные пользователя и localStorage
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      
      // Удаляю из localStorage
      localStorage.removeItem('currentUser');
    },
    
    // Строки 88-94: Ошибка авторизации
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Строки 96-109: Восстановление сессии из localStorage
    // Вызывается при загрузке приложения
    restoreSession: (state) => {
      const savedUser = localStorage.getItem('currentUser');
      const savedUsers = localStorage.getItem('users');
      
      if (savedUser) {
        state.user = JSON.parse(savedUser);
        state.isAuthenticated = true;
      }
      
      if (savedUsers) {
        state.users = JSON.parse(savedUsers);
      }
    },
    
    // Строки 111-116: Очистка ошибки
    clearError: (state) => {
      state.error = null;
    },
  },
});

// Строки 122-130: Экспортирую actions
export const { 
  authStart,
  registerSuccess, 
  loginSuccess, 
  logout,
  authFailure,
  restoreSession,
  clearError
} = authSlice.actions;

// Строка 133: Экспортирую reducer
export default authSlice.reducer;
