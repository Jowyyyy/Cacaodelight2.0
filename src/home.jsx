import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../src/components/login/login'; // Ajusta la ruta según tu estructura
import Register from '../src/components/login/register'; // Ajusta la ruta según tu estructura
import HomePage from './homePage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import './styles.css';

function Home() {
  return (
    <Router>
      {/* Definición de rutas */}
      <Routes>
        {/* Redirige automáticamente desde la página principal ("/") al formulario de registro ("/signup") */}
        <Route path="/" element={<Navigate to="/signup" />} />  
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path='/homePage' element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<Navigate to="/homePage" />} />
        {/* Agrega más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default Home;
