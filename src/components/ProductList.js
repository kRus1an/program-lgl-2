// Строка 1: Импортирую React и хуки
import React, { useEffect } from 'react';
// Строка 3: Импортирую хуки Redux для работы с store
import { useSelector, useDispatch } from 'react-redux';
// Строка 5: Импортирую хук для навигации между страницами
import { useNavigate } from 'react-router-dom';
// Строка 7: Импортирую motion для анимаций
import { motion } from 'framer-motion';
// Строка 9: Импортирую action для загрузки товаров
import { loadProducts } from '../store/productsSlice';

// Строка 11: Создаю компонент списка товаров
function ProductList() {
  // Строка 13: Получаю данные из Redux store
  // useSelector - хук для чтения данных из store
  const { items: products, isLoading } = useSelector((state) => state.products);
  
  // Строка 17: Получаю dispatch для отправки actions в store
  const dispatch = useDispatch();
  
  // Строка 20: Получаю функцию navigate для перехода между страницами
  const navigate = useNavigate();

  // Строки 23-28: При загрузке компонента загружаю товары
  useEffect(() => {
    // Имитирую задержку загрузки (как с сервера)
    const timer = setTimeout(() => {
      dispatch(loadProducts());  // Отправляю action для загрузки товаров
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Строки 30-34: Обработчик клика по карточке товара
  // При клике переходим на страницу детального просмотра
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);  // Переход на /product/1, /product/2 и т.д.
  };

  // Строки 36-46: Настройки анимаций (как в предыдущей версии)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  const hoverVariant = {
    scale: 1.03,
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  };

  const buttonHover = {
    scale: 1.05,
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
  };

  // Строки 60-150: Возвращаю JSX разметку
  return (
    <section className="popular-products">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Популярные товары
      </motion.h2>
      
      {/* Строки 70-72: Показываю индикатор загрузки или список товаров */}
      {isLoading ? (
        <div className="loading">Загрузка товаров...</div>
      ) : (
        <motion.div 
          className="product-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Строки 80-140: Перебираю все товары и создаю карточки */}
          {products.map((product) => (
            <motion.div 
              key={product.id}
              className="product-card"
              variants={itemVariants}
              whileHover={hoverVariant}
              onClick={() => handleProductClick(product.id)}  // При клике переходим на детальную страницу
              style={{ cursor: 'pointer' }}  // Показываю, что карточка кликабельна
            >
              {/* Строки 90-99: Изображение товара с рейтингом */}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="rating">
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                  <span> {product.rating}</span>
                </div>
              </div>
              
              {/* Строки 101-103: Название и описание товара */}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              
              {/* Строки 105-118: Футер карточки с ценой и кнопкой */}
              <div className="product-footer">
                <span className="price">{product.price.toLocaleString()} ₽</span>
                <motion.button 
                  className="add-to-cart"
                  whileHover={buttonHover}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();  // Останавливаю всплытие события, чтобы не переходить на детальную страницу
                    alert(`Товар "${product.name}" добавлен в корзину!`);
                  }}
                >
                  В корзину
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}

export default ProductList;
