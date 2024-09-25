import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db, auth } from '../src/components/login/firebase';
import { doc, setDoc } from 'firebase/firestore';
import './components/productos/productos.css';
const ProductPage = () => {
  const location = useLocation();
  const { state } = location || {}; 
    const { product } = state;
  const [message, setMessage] = useState('');

  if (!product) {
    return <div>No se encontró el producto.</div>;
  }

  const addToCart = async () => {
    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      await setDoc(cartRef, {
        items: [{ id: product.id, name: product.name, price: product.price }],
      }, { merge: true });
      setMessage('Producto añadido al carrito con éxito');
    } else {
      setMessage('Inicia sesión para añadir productos al carrito');
    }
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Precio: {product.price} €</p>
      <button onClick={addToCart}>Añadir al carrito</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProductPage;
