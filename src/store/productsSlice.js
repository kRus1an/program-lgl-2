// Строка 1: Импортирую функцию для создания slice (части store)
import { createSlice } from '@reduxjs/toolkit';
// Строка 3: Импортирую данные о товарах из JSON
import productsData from '../data/products.json';

// Строки 6-11: Начальное состояние для товаров
const initialState = {
  items: [],              // Массив всех товаров
  selectedProduct: null,  // Выбранный товар для детального просмотра
  isLoading: true,        // Идет ли загрузка данных
  error: null,            // Ошибка при загрузке (если есть)
};

// Строки 13-50: Создаю slice - это кусок Redux store для товаров
const productsSlice = createSlice({
  name: 'products',  // Имя slice
  initialState,      // Начальное состояние
  
  // Строки 18-49: Reducers - функции для изменения состояния
  reducers: {
    // Строки 20-24: Загрузка товаров из JSON
    // Вызывается при старте приложения
    loadProducts: (state) => {
      state.items = productsData.products;  // Записываю товары в state
      state.isLoading = false;              // Убираю индикатор загрузки
    },
    
    // Строки 26-30: Выбор товара для детального просмотра
    // Вызывается при клике на карточку товара
    selectProduct: (state, action) => {
      // action.payload - это ID товара
      state.selectedProduct = state.items.find(item => item.id === action.payload);
    },
    
    // Строки 32-35: Очистка выбранного товара
    // Вызывается при возврате к списку товаров
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
    // Строки 37-41: Установка состояния загрузки
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Строки 43-47: Установка ошибки
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

// Строки 52-57: Экспортирую actions (действия) для использования в компонентах
export const { 
  loadProducts, 
  selectProduct, 
  clearSelectedProduct,
  setLoading,
  setError 
} = productsSlice.actions;

// Строка 60: Экспортирую reducer для подключения к store
export default productsSlice.reducer;
