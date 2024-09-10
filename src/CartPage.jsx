import React, { useEffect, useState } from 'react';
import { db, auth } from '../src/components/login/firebase';
import { doc, getDoc } from 'firebase/firestore';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCartItems(cartSnap.data().items || []);
        }
      }
    };

    fetchCart();
  }, []);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price} USD</p>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
