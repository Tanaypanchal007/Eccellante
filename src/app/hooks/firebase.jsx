import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc, arrayUnion, updateDoc } from 'firebase/firestore';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const cartRef = doc(db, 'carts', user.uid);
        const cartSnap = await getDoc(cartRef);
        if (cartSnap.exists()) {
          setCart(cartSnap.data().items || []);
        } else {
          await setDoc(cartRef, { items: [] });
        }
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const currentItems = cartSnap.data().items || [];
        const existingItemIndex = currentItems.findIndex(item => item.id === product.id);

        if (existingItemIndex !== -1) {
          // Item already exists, update quantity
          currentItems[existingItemIndex].quantity += 1;
          await updateDoc(cartRef, { items: currentItems });
        } else {
          // Item doesn't exist, add new item
          await updateDoc(cartRef, {
            items: arrayUnion({ ...product, quantity: 1 })
          });
        }
      } else {
        // Cart doesn't exist, create new cart with item
        await setDoc(cartRef, {
          items: [{ ...product, quantity: 1 }]
        });
      }

      // Fetch updated cart
      const updatedCartSnap = await getDoc(cartRef);
      setCart(updatedCartSnap.data().items || []);
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      const cartRef = doc(db, 'carts', user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const currentItems = cartSnap.data().items || [];
        const updatedItems = currentItems.filter(item => item.id !== productId);
        await updateDoc(cartRef, { items: updatedItems });
        setCart(updatedItems);
      }
    }
  };

  return { cart, addToCart, removeFromCart };
};