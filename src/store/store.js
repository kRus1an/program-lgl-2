// Строка 1: Импортирую функцию для создания Redux store
import { configureStore } from '@reduxjs/toolkit';
// Строка 3: Импортирую reducer для управления товарами
import productsReducer from './productsSlice';
// Строка 5: Импортирую reducer для управления избранным
import favoritesReducer from './favoritesSlice';
// Строка 7: Импортирую reducer для управления корзиной и заказами
import basketReducer from './basketSlice';
// Строка 9: Импортирую reducer для управления авторизацией
import authReducer from './authSlice';
// Строка 11: Импортирую middleware для обработки авторизации
import authMiddleware from './authMiddleware';

// Строки 14-23: Создаю главное хранилище приложения (store)
// Использую combineReducers для объединения четырех редьюсеров
// Добавляю authMiddleware для обработки регистрации и входа
export const store = configureStore({
  reducer: {
    products: productsReducer,    // Reducer для товаров
    favorites: favoritesReducer,  // Reducer для избранного
    basket: basketReducer,        // Reducer для корзины и заказов
    auth: authReducer,            // Reducer для авторизации
  },
  // Строка 23: Добавляю middleware для перехвата actions авторизации
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authMiddleware),
});
