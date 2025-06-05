import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './App.css'
import ContactWidget from './components/ContactWidget';
import Technology from './pages/Technology';
import AboutUs from './pages/AboutUs';

import BlogGrid from './pages/BlogGrid';
import Awards from './pages/Awards';
// import ProductDetails from './pages/ProductDetailPage';
import QnaSection from './pages/QnaSection';
import ProductDetailPage from './pages/ProductDetailPage';
import BlogDetailPage from './pages/BlogDetailPage';
import OrderPage from './pages/OrderPage';
import DemoPage from './pages/DemoPage';
import AdminPage from './pages/AdminPage';
import Careers from './pages/Careers';



const App = () => {
  return (
    <>
      <Header />
      <ContactWidget />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path='/blogs' element={<BlogGrid />} />
        <Route path='/awards' element={<Awards />} />
        {/* <Route path='/product-details' element={<ProductDetailspa />} /> */}
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/blogs/:id" element={<BlogDetailPage />} />

        <Route path='Qna' element={<QnaSection />} />
        <Route path='order' element={<OrderPage />} />
        <Route path='demo' element={<DemoPage />} />
        <Route path='/9347363354' element={<AdminPage />} />
        <Route path='careers' element={<Careers />} />

      </Routes>
    </>
  );
};

export default App;
