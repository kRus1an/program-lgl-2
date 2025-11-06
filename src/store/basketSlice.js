// Строка 1: Импортирую функцию для создания slice
import { createSlice } from '@reduxjs/toolkit';

// Строки 4-8: Начальное состояние для корзины
const initialState = {
  cartItems: [],   // Товары в корзине (для добавления в заказ)
  orders: [],      // Список всех заказов
};

// Строки 10-120: Создаю slice для управления корзиной и заказами
const basketSlice = createSlice({
  name: 'basket',  // Имя slice
  initialState,    // Начальное состояние
  
  // Строки 15-119: Reducers - функции для изменения состояния
  reducers: {
    // Строки 17-30: Добавление товара в корзину
    // Вызывается при клике на кнопку "В корзину"
    addToCart: (state, action) => {
      const product = action.payload;  // Получаю объект товара
      
      // Проверяю, есть ли уже этот товар в корзине
      const existingItem = state.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        // Если товар уже есть - увеличиваю количество
        existingItem.quantity += 1;
      } else {
        // Если товара нет - добавляю с количеством 1
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    
    // Строки 32-41: Удаление товара из корзины
    // Вызывается при клике на кнопку "Удалить"
    removeFromCart: (state, action) => {
      const productId = action.payload;
      // Фильтрую массив, оставляя все товары кроме удаляемого
      state.cartItems = state.cartItems.filter(item => item.id !== productId);
    },
    
    // Строки 43-56: Увеличение количества товара
    // Вызывается при клике на кнопку "+"
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(item => item.id === productId);
      
      if (item) {
        item.quantity += 1;  // Увеличиваю количество на 1
      }
    },
    
    // Строки 58-73: Уменьшение количества товара
    // Вызывается при клике на кнопку "-"
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const item = state.cartItems.find(item => item.id === productId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;  // Уменьшаю количество на 1
        } else {
          // Если количество = 1, удаляю товар из корзины
          state.cartItems = state.cartItems.filter(i => i.id !== productId);
        }
      }
    },
    
    // Строки 75-80: Очистка корзины
    // Вызывается после оформления заказа
    clearCart: (state) => {
      state.cartItems = [];  // Очищаю корзину
    },
    
    // Строки 82-97: Создание нового заказа
    // Вызывается при клике на кнопку "Оформить заказ"
    createOrder: (state, action) => {
      const { name, age, selectedProducts } = action.payload;
      
      // Создаю новый объект заказа
      const newOrder = {
        id: Date.now(),  // Уникальный ID на основе времени
        name,            // Имя покупателя
        age,             // Возраст покупателя
        products: selectedProducts,  // Массив товаров в заказе
        status: 'Не доставлен',      // Начальный статус
        date: new Date().toLocaleString('ru-RU'),  // Дата создания заказа
      };
      
      // Добавляю заказ в начало списка (новые заказы сверху)
      state.orders.unshift(newOrder);
    },
    
    // Строки 99-108: Изменение статуса заказа
    // Вызывается при клике на кнопку "Изменить статус"
    updateOrderStatus: (state, action) => {
      const { orderId, newStatus } = action.payload;
      const order = state.orders.find(order => order.id === orderId);
      
      if (order) {
        order.status = newStatus;  // Обновляю статус заказа
      }
    },
    
    // Строки 110-117: Удаление заказа
    // Вызывается при клике на кнопку "Удалить заказ"
    deleteOrder: (state, action) => {
      const orderId = action.payload;
      // Фильтрую массив, оставляя все заказы кроме удаляемого
      state.orders = state.orders.filter(order => order.id !== orderId);
    },
  },
});

// Строки 122-131: Экспортирую actions для использования в компонентах
export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  createOrder,
  updateOrderStatus,
  deleteOrder 
} = basketSlice.actions;

// Строка 134: Экспортирую reducer для подключения к store
export default basketSlice.reducer;
