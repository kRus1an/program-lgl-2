// Строка 1: Импортирую React и хуки
import React, { useEffect } from 'react';
// Строка 3: Импортирую хуки Redux
import { useSelector, useDispatch } from 'react-redux';
// Строка 5: Импортирую хуки для работы с роутингом
import { useParams, useNavigate } from 'react-router-dom';
// Строка 7: Импортирую motion для анимаций
import { motion } from 'framer-motion';
// Строка 9: Импортирую actions из Redux
import { selectProduct, clearSelectedProduct } from '../store/productsSlice';
// Строка 11: Импортирую стили
import './ProductDetail.css';

// Строка 13: Создаю компонент детальной страницы товара
function ProductDetail() {
  // Строка 15: Получаю ID товара из URL (например, /product/1)
  const { id } = useParams();
  
  // Строка 18: Получаю выбранный товар из Redux store
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  
  // Строка 21: Получаю dispatch и navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Строки 25-34: При загрузке компонента выбираю товар по ID
  useEffect(() => {
    // Преобразую ID из строки в число
    const productId = parseInt(id);
    // Отправляю action для выбора товара
    dispatch(selectProduct(productId));
    
    // При размонтировании компонента очищаю выбранный товар
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  // Строки 36-40: Обработчик возврата к списку товаров
  const handleBackClick = () => {
    navigate('/');  // Переход на главную страницу
  };

  // Строки 42-46: Если товар еще не загружен, показываю индикатор загрузки
  if (!selectedProduct) {
    return <div className="loading">Загрузка товара...</div>;
  }

  // Строки 48-150: Возвращаю JSX разметку детальной страницы
  return (
    <motion.div 
      className="product-detail"
      initial={{ opacity: 0, y: 20 }}  // Начальное состояние - невидимый и ниже
      animate={{ opacity: 1, y: 0 }}   // Конечное состояние - видимый и на месте
      transition={{ duration: 0.5 }}   // Длительность анимации
    >
      {/* Строки 56-64: Кнопка "Назад к списку" */}
      <motion.button 
        className="back-button"
        onClick={handleBackClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ← Назад к списку
      </motion.button>

      {/* Строки 66-130: Контейнер с информацией о товаре */}
      <div className="product-detail-container">
        {/* Строки 68-80: Левая часть - изображение товара */}
        <motion.div 
          className="product-detail-image"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img src={selectedProduct.image} alt={selectedProduct.name} />
          {/* Строки 76-80: Рейтинг товара */}
          <div className="product-detail-rating">
            {'★'.repeat(Math.floor(selectedProduct.rating))}
            {'☆'.repeat(5 - Math.floor(selectedProduct.rating))}
            <span className="rating-number"> {selectedProduct.rating} из 5</span>
          </div>
        </motion.div>

        {/* Строки 82-130: Правая часть - информация о товаре */}
        <motion.div 
          className="product-detail-info"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Строка 90: Название товара */}
          <h1>{selectedProduct.name}</h1>
          
          {/* Строка 93: Цена товара */}
          <div className="product-detail-price">
            {selectedProduct.price.toLocaleString()} ₽
          </div>

          {/* Строки 98-103: Описание товара */}
          <div className="product-detail-description">
            <h3>Описание</h3>
            <p>{selectedProduct.description}</p>
          </div>

          {/* Строки 105-115: Характеристики товара (дополнительная информация) */}
          <div className="product-detail-specs">
            <h3>Характеристики</h3>
            <ul>
              <li><strong>Артикул:</strong> {selectedProduct.id}</li>
              <li><strong>Рейтинг:</strong> {selectedProduct.rating} / 5.0</li>
              <li><strong>Наличие:</strong> В наличии</li>
              <li><strong>Гарантия:</strong> 12 месяцев</li>
            </ul>
          </div>

          {/* Строки 117-128: Кнопки действий */}
          <div className="product-detail-actions">
            <motion.button 
              className="add-to-cart-detail"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert(`Товар "${selectedProduct.name}" добавлен в корзину!`)}
            >
              Добавить в корзину
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default ProductDetail;
