import React, { useEffect, useState } from 'react';
import { db, auth } from '../login/firebase'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; 
import './cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate(); 

  const fetchCartItems = async () => {
    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        setCartItems(cartSnap.data().items || []);
      } else {
        setCartItems([]);
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const currentItems = cartSnap.data().items || [];
        const updatedItems = currentItems.filter(item => item.id !== itemId);

        await updateDoc(cartRef, { items: updatedItems });
        setCartItems(updatedItems);
      }
    }
  };

  return (
      <div className="cart-container">
        <h2>Tu Cesta</h2>
        {cartItems.length === 0 ? (
          <p className="cart-empty-message">No tienes productos en tu cesta</p>
        ) : (
          <div>
            <ul className="cart-items">
              {cartItems.map(item => (
                <li key={item.id}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                  />
                  <div className="cart-item-details">
                    <p>{item.name} - {item.quantity} x ${item.price}</p>
                    <p>Total: ${item.quantity * item.price}</p>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)}>
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <h3 className="cart-total">Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
          </div>
        )}

        <button className="back-home-btn" onClick={() => navigate('/homePage')}>
          Volver al inicio
        </button>
      </div>
  );
};

export default Cart;
