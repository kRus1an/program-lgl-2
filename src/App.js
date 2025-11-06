// Строка 1: Импортирую React и хуки
import React from 'react';
// Строка 3: Импортирую компоненты для роутинга
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// Строка 5: Импортирую Provider для подключения Redux store
import { Provider } from 'react-redux';
// Строка 7: Импортирую motion для анимаций
import { motion } from 'framer-motion';
// Строка 9: Импортирую Redux store
import { store } from './store/store';
// Строка 11: Импортирую компоненты
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Favorites from './components/Favorites';
// Строка 15: Импортирую стили
import './App.css';

// Строка 16: Главный компонент приложения
function App() {
  // Строки 18-26: Настройки анимаций для кнопки
  const buttonHover = {
    scale: 1.05,
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: 'reverse'
    }
  };

  // Строки 34-37: Настройки анимаций для карточек преимуществ
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const hoverVariant = {
    scale: 1.03,
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
  };

  // Строки 60-250: Возвращаю JSX разметку
  return (
    // Строка 62: Оборачиваю приложение в Provider для доступа к Redux store
    <Provider store={store}>
      {/* Строка 64: Оборачиваю в Router для работы маршрутизации */}
      <Router>
        <div className="app">
          {/* Строки 66-92: Header с навигацией */}
          <motion.header 
            className="header"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {/* Строки 72-77: Логотип с ссылкой на главную */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <motion.div 
                className="logo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Корзина Покупок
              </motion.div>
            </Link>
            
            {/* Строки 85-102: Навигационное меню */}
            <nav className="nav">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <motion.span 
                  className="nav-link active"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Главная
                </motion.span>
              </Link>
              
              {/* Строки 96-102: Ссылка на страницу избранного */}
              <Link to="/favorites" style={{ textDecoration: 'none' }}>
                <motion.span 
                  className="nav-link"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ❤️ Избранное
                </motion.span>
              </Link>
            </nav>
          </motion.header>

          {/* Строки 96-180: Основной контент с маршрутизацией */}
          <main className="main-content">
            {/* Строки 98-104: Настройка маршрутов (Routes) */}
            {/* Route "/" - главная страница со списком товаров */}
            {/* Route "/product/:id" - детальная страница товара */}
            <Routes>
              {/* Строка 103: Маршрут для главной страницы */}
              <Route path="/" element={
                <>
                  {/* Строки 106-125: Hero секция (приветственный баннер) */}
                  <motion.section 
                    className="hero"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Добро пожаловать в наш интернет-магазин
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Широкий ассортимент товаров по выгодным ценам
                    </motion.p>
                    <motion.button 
                      className="cta-button"
                      whileHover={buttonHover}
                      whileTap={{ scale: 0.95 }}
                      animate={pulseAnimation}
                    >
                      В каталог
                    </motion.button>
                  </motion.section>

                  {/* Строки 139-165: Секция преимуществ */}
                  <motion.section 
                    className="features"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                  >
                    {[
                      {
                        title: 'Быстрая доставка',
                        description: 'Доставка по всему городу в течение дня',
                        icon: '🚚'
                      },
                      {
                        title: 'Гарантия качества',
                        description: 'Только проверенные поставщики',
                        icon: '✅'
                      },
                      {
                        title: 'Поддержка 24/7',
                        description: 'Всегда готовы ответить на ваши вопросы',
                        icon: '🛎️'
                      }
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="feature-card"
                        variants={itemVariants}
                        whileHover={hoverVariant}
                      >
                        <div className="feature-icon">{feature.icon}</div>
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </motion.div>
                    ))}
                  </motion.section>

                  {/* Строка 175: Компонент списка товаров */}
                  <ProductList />
                </>
              } />
              
              {/* Строка 180: Маршрут для детальной страницы товара */}
              <Route path="/product/:id" element={<ProductDetail />} />
              
              {/* Строка 183: Маршрут для страницы избранного */}
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </main>

          {/* Строки 183-215: Footer (подвал сайта) */}
          <motion.footer 
            className="footer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="footer-content">
              <motion.div 
                className="footer-section"
                whileHover={{ x: 5 }}
              >
                <h3>О нас</h3>
                <p>Лучший интернет-магазин с 2023 года</p>
              </motion.div>
              <motion.div 
                className="footer-section"
                whileHover={{ x: 5 }}
              >
                <h3>Контакты</h3>
                <p>Email: info@basket-shop.ru</p>
                <p>Телефон: +7 (XXX) XXX-XX-XX</p>
              </motion.div>
            </div>
            <motion.div 
              className="footer-bottom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p>&copy; {new Date().getFullYear()} Корзина Покупок. Все права защищены.</p>
            </motion.div>
          </motion.footer>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
