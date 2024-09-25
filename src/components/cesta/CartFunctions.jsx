import { db, auth } from '../login/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const addToCart = async (product) => {
  const user = auth.currentUser;
  
  if (!user) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    return;
  }

  const cartRef = doc(db, 'carts', user.uid);

  try {
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const cartData = cartSnap.data();
      const updatedItems = [...cartData.items, { ...product, quantity: 1 }];
      await setDoc(cartRef, { items: updatedItems }, { merge: true });
    } else {
      await setDoc(cartRef, { items: [{ ...product, quantity: 1 }] });
    }

    alert("Producto agregado al carrito");
  } catch (error) {
    console.error("Error al agregar el producto al carrito:", error);
  }
};
