import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { getUserDocument, updateUserDocument } from '../hooks/firebase';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        const userData = await getUserDocument(user.uid, 'carts');
        setCart(userData?.items || []);
      }
    };
    fetchCart();
  }, [user]);

  const addToCart = async (product) => {
    if (user) {
      const updatedCart = [...cart];
      const existingItem = updatedCart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        updatedCart.push({ ...product, quantity: 1 });
      }
      await updateUserDocument(user.uid, 'carts', { items: updatedCart });
      setCart(updatedCart);
    }
  };

  const removeFromCart = async (productId) => {
    if (user) {
      const updatedCart = cart.filter(item => item.id !== productId);
      await updateUserDocument(user.uid, 'carts', { items: updatedCart });
      setCart(updatedCart);
    }
  };

  return { cart, addToCart, removeFromCart };
};