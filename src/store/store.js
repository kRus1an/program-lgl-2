// Строка 1: Импортирую функцию для создания Redux store
import { configureStore } from '@reduxjs/toolkit';
// Строка 3: Импортирую reducer для управления товарами
import productsReducer from './productsSlice';
// Строка 5: Импортирую reducer для управления избранным
import favoritesReducer from './favoritesSlice';

// Строки 8-14: Создаю главное хранилище приложения (store)
// Использую combineReducers для объединения нескольких редьюсеров
// Теперь store содержит два независимых раздела: products и favorites
export const store = configureStore({
  reducer: {
    products: productsReducer,    // Reducer для товаров (список, выбранный товар)
    favorites: favoritesReducer,  // Reducer для избранного (список избранных)
  },
});
