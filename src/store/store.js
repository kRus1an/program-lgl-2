// Строка 1: Импортирую функцию для создания Redux store
import { configureStore } from '@reduxjs/toolkit';
// Строка 3: Импортирую reducer для управления товарами
import productsReducer from './productsSlice';
// Строка 5: Импортирую reducer для управления избранным
import favoritesReducer from './favoritesSlice';
// Строка 7: Импортирую reducer для управления корзиной и заказами
import basketReducer from './basketSlice';

// Строки 10-17: Создаю главное хранилище приложения (store)
// Использую combineReducers для объединения трех редьюсеров
// Теперь store содержит три независимых раздела: products, favorites и basket
export const store = configureStore({
  reducer: {
    products: productsReducer,    // Reducer для товаров (список, выбранный товар)
    favorites: favoritesReducer,  // Reducer для избранного (список избранных)
    basket: basketReducer,        // Reducer для корзины и заказов
  },
});
