import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebaseConfig';
import { getUserDocument, addToUserArray, removeFromUserArray } from '../hooks/firebase';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user) {
        const userData = await getUserDocument(user.uid, 'wishlists');
        setWishlist(userData?.items || []);
      }
    };
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (product) => {
    if (user) {
      try {
        console.log("Adding to wishlist. User:", user.uid);
        console.log("Product:", JSON.stringify(product));
        const wishlistRef = doc(db, 'wishlists', user.uid);
        await updateDoc(wishlistRef, {
          items: arrayUnion(product)
        });
        console.log("Successfully updated Firestore");
        setWishlist(prev => [...prev, product]);
        console.log("Successfully updated local state");
        return true;
      } catch (error) {
        console.error("Error adding to wishlist:", error);
        if (error.code === 'not-found') {
          try {
            console.log("Wishlist not found, creating new document");
            await setDoc(wishlistRef, { items: [product] });
            setWishlist([product]);
            console.log("Created new wishlist and added item");
            return true;
          } catch (innerError) {
            console.error("Error creating new wishlist:", innerError);
          }
        }
        return false;
      }
    }
    console.log("User not authenticated");
    return false;
  };
  const removeFromWishlist = async (productId) => {
    if (user) {
      const productToRemove = wishlist.find(item => item.id === productId);
      await removeFromUserArray(user.uid, 'wishlists', 'items', productToRemove);
      setWishlist(prev => prev.filter(item => item.id !== productId));
    }
  };

  return { wishlist, addToWishlist, removeFromWishlist };
};