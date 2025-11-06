import React, { useState, useEffect } from 'react';
import './App.css';
import productsData from './data/products.json';
import { motion } from 'framer-motion';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setProducts(productsData.products);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
  return (
    <div className="app">
      <motion.header 
        className="header"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.div 
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Корзина Покупок
        </motion.div>
        <nav className="nav">
          {['Главная', 'Каталог', 'Корзина', 'Контакты'].map((item, index) => (
            <motion.a 
              key={index}
              href="#" 
              className={`nav-link ${index === 0 ? 'active' : ''}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </motion.header>

      <main className="main-content">
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

        <section className="popular-products">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Популярные товары
          </motion.h2>
          
          {isLoading ? (
            <div className="loading">Загрузка товаров...</div>
          ) : (
            <motion.div 
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <motion.div 
                  key={product.id}
                  className="product-card"
                  variants={itemVariants}
                  whileHover={hoverVariant}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="rating">
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                      <span> {product.rating}</span>
                    </div>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <span className="price">{product.price.toLocaleString()} ₽</span>
                    <motion.button 
                      className="add-to-cart"
                      whileHover={buttonHover}
                      whileTap={{ scale: 0.95 }}
                    >
                      В корзину
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>

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
  );
}

export default App;
