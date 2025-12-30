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
import Cart from './page/Cart';
import Shipping from './page/Shipping';
import Account from './page/Account';
import Orders from './Components/account/Orders';
import Alerts from './Components/account/Alerts';
import Information from './Components/account/Information';
import Returns from './Components/account/Returns';
import Wishlist from './Components/account/Wishlist';

const App = () => {
  const location = useLocation();

  return (
    <AppContextProvider>
      <div>
        {(location.pathname !== '/cart' && location.pathname !== '/shipping' && !location.pathname.startsWith('/account')) && <Navbar />}
        <ScrollToTop />
        <NavCategory />

        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/collection/:path" element={<CategoryProducts />} />
            <Route path="/collection" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/product/:sku" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/account" element={<Account />} >
              <Route path="orders" element={<Orders />} />
              <Route path="returns" element={<Returns />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="information" element={<Information />} />
              <Route path="alerts" element={<Alerts />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
    </AppContextProvider>
  );
}

export default App;