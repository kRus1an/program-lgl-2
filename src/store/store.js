// Строка 1: Импортирую функцию для создания Redux store
import { configureStore } from '@reduxjs/toolkit';
// Строка 3: Импортирую reducer для управления товарами
import productsReducer from './productsSlice';

// Строки 6-10: Создаю главное хранилище приложения (store)
// Здесь будут храниться все данные: товары, корзина, фильтры и т.д.
export const store = configureStore({
  reducer: {
    products: productsReducer,  // Подключаю reducer для товаров
  },
});
