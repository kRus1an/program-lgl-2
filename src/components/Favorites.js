// Строка 1: Импортирую React
import React from 'react';
// Строка 3: Импортирую хуки Redux
import { useSelector, useDispatch } from 'react-redux';
// Строка 5: Импортирую хук для навигации
import { useNavigate } from 'react-router-dom';
// Строка 7: Импортирую motion для анимаций
import { motion } from 'framer-motion';
// Строка 9: Импортирую actions для работы с избранным
import { removeFromFavorites, clearFavorites } from '../store/favoritesSlice';
// Строка 11: Импортирую стили
import './Favorites.css';

// Строка 13: Создаю компонент страницы избранного
function Favorites() {
  // Строка 15: Получаю список избранных товаров из Redux
  const favoriteItems = useSelector((state) => state.favorites.items);
  
  // Строка 18: Получаю dispatch и navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Строки 22-26: Обработчик клика по карточке товара
  // Переход на детальную страницу товара
  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Строки 28-32: Обработчик удаления товара из избранного
  const handleRemove = (e, productId) => {
    e.stopPropagation();  // Останавливаю всплытие события
    dispatch(removeFromFavorites(productId));  // Удаляю товар
  };

  // Строки 34-38: Обработчик очистки всего избранного
  const handleClearAll = () => {
    if (window.confirm('Вы уверены, что хотите очистить все избранное?')) {
      dispatch(clearFavorites());  // Очищаю весь список
    }
  };

  // Строки 40-44: Обработчик возврата на главную
  const handleBackClick = () => {
    navigate('/');
  };

  // Строки 46-56: Настройки анимаций
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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

  // Строки 68-180: Возвращаю JSX разметку
  return (
    <motion.div 
      className="favorites-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Строки 76-84: Шапка страницы с кнопкой "Назад" */}
      <div className="favorites-header">
        <motion.button 
          className="back-button"
          onClick={handleBackClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Назад к списку
        </motion.button>
        
        {/* Строка 87: Заголовок страницы */}
        <h1>Избранные товары</h1>
        
        {/* Строки 90-99: Кнопка "Очистить все" (показывается только если есть товары) */}
        {favoriteItems.length > 0 && (
          <motion.button 
            className="clear-all-button"
            onClick={handleClearAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Очистить все
          </motion.button>
        )}
      </div>

      {/* Строки 103-110: Если избранное пустое - показываю сообщение */}
      {favoriteItems.length === 0 ? (
        <motion.div 
          className="empty-favorites"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="empty-icon">💔</p>
          <h2>Ваше избранное пусто</h2>
          <p>Добавьте товары в избранное, чтобы они появились здесь</p>
          <motion.button 
            className="go-shopping-button"
            onClick={handleBackClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Перейти к покупкам
          </motion.button>
        </motion.div>
      ) : (
        <>
          {/* Строка 125: Счетчик товаров */}
          <p className="favorites-count">
            Товаров в избранном: <strong>{favoriteItems.length}</strong>
          </p>
          
          {/* Строки 130-180: Сетка с избранными товарами */}
          <motion.div 
            className="favorites-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {favoriteItems.map((product) => (
              <motion.div 
                key={product.id}
                className="favorite-card"
                variants={itemVariants}
                whileHover={hoverVariant}
                onClick={() => handleProductClick(product.id)}
                style={{ cursor: 'pointer' }}
              >
                {/* Строки 145-160: Изображение товара с кнопкой удаления */}
                <div className="favorite-image">
                  <img src={product.image} alt={product.name} />
                  
                  {/* Строки 149-157: Кнопка удаления из избранного */}
                  <motion.button
                    className="remove-favorite-btn"
                    onClick={(e) => handleRemove(e, product.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    title="Удалить из избранного"
                  >
                    ❌
                  </motion.button>
                  
                  {/* Строки 160-165: Рейтинг товара */}
                  <div className="rating">
                    {'★'.repeat(Math.floor(product.rating))}
                    {'☆'.repeat(5 - Math.floor(product.rating))}
                    <span> {product.rating}</span>
                  </div>
                </div>
                
                {/* Строки 168-170: Название и описание */}
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                
                {/* Строки 173-175: Цена товара */}
                <div className="favorite-price">
                  <span className="price">{product.price.toLocaleString()} ₽</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default Favorites;
