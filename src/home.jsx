import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/components/login/login'; 
import Register from '../src/components/login/register'; 
import HomePage from './homePage';
import ProductPage from './ProductPage';
import Cart from '../src/components/cesta/Cart'; 

function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path='/homePage' element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Home;
