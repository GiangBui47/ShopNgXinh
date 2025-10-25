import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './page/Home';
import Footer from './Components/Footer';
import NavCategory from './Components/NavCategory';
import { AppContextProvider } from './context/AppContext';
import CategoryProducts from './page/CategoryProducts';
import Shop from './page/Shop';
import About from './page/About';
import FAQ from './page/FAQ';
import ScrollToTop from './Components/ScrollToTop';
import ProductDetail from './page/ProductDetail';

const App = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <AppContextProvider>
      <div>
        <Navbar />
        <ScrollToTop />
        {!isHomePage && (
          <NavCategory />
        )}

        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/collection/:path" element={<CategoryProducts />} />
            <Route path="/collection" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/product/:sku" element={<ProductDetail />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppContextProvider>
  );
}

export default App;