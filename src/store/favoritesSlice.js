// Строка 1: Импортирую функцию для создания slice
import { createSlice } from '@reduxjs/toolkit';

// Строки 4-7: Начальное состояние для избранного
const initialState = {
  items: [],  // Массив избранных товаров
};

// Строки 9-48: Создаю slice для управления избранным
const favoritesSlice = createSlice({
  name: 'favorites',  // Имя slice
  initialState,       // Начальное состояние
  
  // Строки 14-47: Reducers - функции для изменения состояния избранного
  reducers: {
    // Строки 16-27: Добавление товара в избранное
    // Вызывается при клике на кнопку "Добавить в избранное"
    addToFavorites: (state, action) => {
      // action.payload - это объект товара
      const product = action.payload;
      
      // Проверяю, нет ли уже этого товара в избранном
      const exists = state.items.find(item => item.id === product.id);
      
      if (!exists) {
        state.items.push(product);  // Добавляю товар, если его еще нет
      }
    },
    
    // Строки 29-35: Удаление товара из избранного
    // Вызывается при клике на кнопку "Удалить из избранного"
    removeFromFavorites: (state, action) => {
      // action.payload - это ID товара
      const productId = action.payload;
      
      // Фильтрую массив, оставляя все товары кроме удаляемого
      state.items = state.items.filter(item => item.id !== productId);
    },
    
    // Строки 37-41: Очистка всего избранного
    // Вызывается при клике на кнопку "Очистить избранное"
    clearFavorites: (state) => {
      state.items = [];  // Очищаю массив избранных товаров
    },
    
    // Строки 43-46: Проверка, находится ли товар в избранном
    // Используется для отображения правильной иконки на кнопке
    isFavorite: (state, action) => {
      const productId = action.payload;
      return state.items.some(item => item.id === productId);
    },
  },
});

// Строки 50-55: Экспортирую actions для использования в компонентах
export const { 
  addToFavorites, 
  removeFromFavorites, 
  clearFavorites,
  isFavorite 
} = favoritesSlice.actions;

// Строка 58: Экспортирую reducer для подключения к store
export default favoritesSlice.reducer;
