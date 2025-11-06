// Строка 1: Импортирую React и хуки
import React, { useState } from 'react';
// Строка 3: Импортирую хуки Redux
import { useSelector, useDispatch } from 'react-redux';
// Строка 5: Импортирую хук для навигации
import { useNavigate } from 'react-router-dom';
// Строка 7: Импортирую motion для анимаций
import { motion } from 'framer-motion';
// Строка 9: Импортирую actions из basketSlice
import { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart,
  createOrder,
  updateOrderStatus,
  deleteOrder 
} from '../store/basketSlice';
// Строка 20: Импортирую стили
import './Basket.css';

// Строка 22: Создаю компонент корзины
function Basket() {
  // Строки 24-26: Получаю данные из Redux store
  const { cartItems, orders } = useSelector((state) => state.basket);
  const { items: allProducts } = useSelector((state) => state.products);
  
  // Строка 29: Получаю dispatch и navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Строки 33-37: Локальное состояние для формы заказа
  const [orderForm, setOrderForm] = useState({
    name: '',              // Имя покупателя
    age: '',               // Возраст покупателя
    selectedProducts: [],  // Выбранные товары для заказа
  });
  
  // Строки 39-42: Локальное состояние для выбора товаров
  const [showProductSelector, setShowProductSelector] = useState(false);

  // Строки 44-48: Обработчик добавления товара в корзину
  // Вызывается при выборе товара из выпадающего списка
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Строки 50-54: Обработчик удаления товара из корзины
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Строки 56-60: Обработчик увеличения количества
  const handleIncrease = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // Строки 62-66: Обработчик уменьшения количества
  const handleDecrease = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // Строки 68-75: Подсчет общей суммы корзины
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  // Строки 77-82: Обработчик изменения полей формы
  const handleFormChange = (e) => {
    setOrderForm({
      ...orderForm,
      [e.target.name]: e.target.value
    });
  };

  // Строки 84-93: Обработчик выбора товаров для заказа (чекбоксы)
  const handleProductSelect = (productId) => {
    if (orderForm.selectedProducts.includes(productId)) {
      // Если товар уже выбран - убираю его
      setOrderForm({
        ...orderForm,
        selectedProducts: orderForm.selectedProducts.filter(id => id !== productId)
      });
    } else {
      // Если товар не выбран - добавляю его
      setOrderForm({
        ...orderForm,
        selectedProducts: [...orderForm.selectedProducts, productId]
      });
    }
  };

  // Строки 105-132: Обработчик оформления заказа
  const handleCreateOrder = (e) => {
    e.preventDefault();
    
    // Валидация формы
    if (!orderForm.name.trim()) {
      alert('Пожалуйста, введите имя');
      return;
    }
    
    if (!orderForm.age || orderForm.age < 1 || orderForm.age > 120) {
      alert('Пожалуйста, введите корректный возраст (1-120)');
      return;
    }
    
    if (orderForm.selectedProducts.length === 0) {
      alert('Пожалуйста, выберите хотя бы один товар');
      return;
    }
    
    // Получаю полные данные о выбранных товарах
    const selectedProductsData = cartItems.filter(item => 
      orderForm.selectedProducts.includes(item.id)
    );
    
    // Создаю заказ
    dispatch(createOrder({
      name: orderForm.name,
      age: parseInt(orderForm.age),
      selectedProducts: selectedProductsData
    }));
    
    // Очищаю форму
    setOrderForm({
      name: '',
      age: '',
      selectedProducts: []
    });
    
    // Удаляю заказанные товары из корзины
    orderForm.selectedProducts.forEach(productId => {
      dispatch(removeFromCart(productId));
    });
    
    alert('Заказ успешно оформлен!');
  };

  // Строки 154-159: Обработчик изменения статуса заказа
  const handleStatusChange = (orderId, currentStatus) => {
    const newStatus = currentStatus === 'Доставлен' ? 'Не доставлен' : 'Доставлен';
    dispatch(updateOrderStatus({ orderId, newStatus }));
  };

  // Строки 161-167: Обработчик удаления заказа
  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Вы уверены, что хотите удалить этот заказ?')) {
      dispatch(deleteOrder(orderId));
    }
  };

  // Строки 169-173: Обработчик возврата на главную
  const handleBackClick = () => {
    navigate('/');
  };

  // Строки 175-600: Возвращаю JSX разметку
  return (
    <motion.div 
      className="basket-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Строки 183-191: Шапка страницы */}
      <div className="basket-header">
        <motion.button 
          className="back-button"
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Назад к списку
        </motion.button>
        <h1>🛒 Корзина и заказы</h1>
      </div>

      <div className="basket-container">
        {/* Строки 197-300: ЭТАП 1 - Добавление товаров в корзину */}
        <motion.section 
          className="basket-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2>Этап 1: Добавить товары в корзину</h2>
          
          {/* Строки 206-214: Кнопка показать/скрыть список товаров */}
          <motion.button
            className="toggle-products-btn"
            onClick={() => setShowProductSelector(!showProductSelector)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showProductSelector ? '▲ Скрыть товары' : '▼ Показать доступные товары'}
          </motion.button>

          {/* Строки 216-245: Выпадающий список товаров */}
          {showProductSelector && (
            <motion.div 
              className="products-selector"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <div className="products-grid-selector">
                {allProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    className="product-selector-card"
                    whileHover={{ scale: 1.03 }}
                  >
                    <img src={product.image} alt={product.name} />
                    <h4>{product.name}</h4>
                    <p className="price">{product.price.toLocaleString()} ₽</p>
                    <motion.button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Добавить в корзину
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Строки 248-300: Товары в корзине */}
          <div className="cart-items">
            <h3>Товары в корзине ({cartItems.length})</h3>
            
            {cartItems.length === 0 ? (
              <p className="empty-message">Корзина пуста. Добавьте товары выше.</p>
            ) : (
              <>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    className="cart-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p className="price">{item.price.toLocaleString()} ₽</p>
                    </div>
                    
                    {/* Строки 273-286: Кнопки изменения количества */}
                    <div className="quantity-controls">
                      <button onClick={() => handleDecrease(item.id)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => handleIncrease(item.id)}>+</button>
                    </div>
                    
                    <p className="item-total">
                      {(item.price * item.quantity).toLocaleString()} ₽
                    </p>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </motion.div>
                ))}
                
                {/* Строки 295-298: Общая сумма */}
                <div className="cart-total">
                  <strong>Итого:</strong>
                  <strong>{calculateTotal().toLocaleString()} ₽</strong>
                </div>
              </>
            )}
          </div>
        </motion.section>

        {/* Строки 305-420: ЭТАП 2 - Оформление заказа */}
        <motion.section 
          className="basket-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2>Этап 2: Оформить заказ</h2>
          
          {cartItems.length === 0 ? (
            <p className="empty-message">Добавьте товары в корзину, чтобы оформить заказ</p>
          ) : (
            <form className="order-form" onSubmit={handleCreateOrder}>
              {/* Строки 319-327: Поле "Имя" */}
              <div className="form-group">
                <label htmlFor="name">Имя покупателя *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={orderForm.name}
                  onChange={handleFormChange}
                  placeholder="Введите ваше имя"
                  required
                />
              </div>

              {/* Строки 329-338: Поле "Возраст" */}
              <div className="form-group">
                <label htmlFor="age">Возраст *</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={orderForm.age}
                  onChange={handleFormChange}
                  placeholder="Введите ваш возраст"
                  min="1"
                  max="120"
                  required
                />
              </div>

              {/* Строки 340-375: Выбор товаров для заказа (чекбоксы) */}
              <div className="form-group">
                <label>Выберите товары для заказа *</label>
                <div className="products-checkboxes">
                  {cartItems.map((item) => (
                    <motion.div 
                      key={item.id}
                      className="checkbox-item"
                      whileHover={{ backgroundColor: '#f8f9fa' }}
                    >
                      <input
                        type="checkbox"
                        id={`product-${item.id}`}
                        checked={orderForm.selectedProducts.includes(item.id)}
                        onChange={() => handleProductSelect(item.id)}
                      />
                      <label htmlFor={`product-${item.id}`}>
                        <img src={item.image} alt={item.name} />
                        <div>
                          <strong>{item.name}</strong>
                          <p>
                            {item.price.toLocaleString()} ₽ × {item.quantity} = {' '}
                            {(item.price * item.quantity).toLocaleString()} ₽
                          </p>
                        </div>
                      </label>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Строки 377-384: Кнопка оформления заказа */}
              <motion.button
                type="submit"
                className="submit-order-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                📦 Оформить заказ
              </motion.button>
            </form>
          )}
        </motion.section>

        {/* Строки 422-550: ЭТАП 3 - Список заказов */}
        <motion.section 
          className="basket-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2>Список заказов ({orders.length})</h2>
          
          {orders.length === 0 ? (
            <p className="empty-message">Заказов пока нет</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <motion.div 
                  key={order.id}
                  className="order-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Строки 443-455: Шапка заказа */}
                  <div className="order-header">
                    <div>
                      <h3>Заказ #{order.id}</h3>
                      <p className="order-date">📅 {order.date}</p>
                    </div>
                    <span className={`order-status ${order.status === 'Доставлен' ? 'delivered' : 'pending'}`}>
                      {order.status === 'Доставлен' ? '✅' : '⏳'} {order.status}
                    </span>
                  </div>

                  {/* Строки 457-463: Информация о покупателе */}
                  <div className="order-info">
                    <p><strong>Покупатель:</strong> {order.name}</p>
                    <p><strong>Возраст:</strong> {order.age} лет</p>
                  </div>

                  {/* Строки 465-485: Товары в заказе */}
                  <div className="order-products">
                    <strong>Товары:</strong>
                    {order.products.map((product, index) => (
                      <div key={index} className="order-product-item">
                        <img src={product.image} alt={product.name} />
                        <div>
                          <p>{product.name}</p>
                          <p className="product-details">
                            {product.price.toLocaleString()} ₽ × {product.quantity} = {' '}
                            <strong>{(product.price * product.quantity).toLocaleString()} ₽</strong>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Строки 487-495: Общая сумма заказа */}
                  <div className="order-total">
                    <strong>Итого:</strong>
                    <strong>
                      {order.products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toLocaleString()} ₽
                    </strong>
                  </div>

                  {/* Строки 497-516: Кнопки управления заказом */}
                  <div className="order-actions">
                    <motion.button
                      className="status-btn"
                      onClick={() => handleStatusChange(order.id, order.status)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {order.status === 'Доставлен' ? 'Отменить доставку' : 'Отметить доставленным'}
                    </motion.button>
                    
                    <motion.button
                      className="delete-order-btn"
                      onClick={() => handleDeleteOrder(order.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🗑️ Удалить заказ
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
}

export default Basket;
