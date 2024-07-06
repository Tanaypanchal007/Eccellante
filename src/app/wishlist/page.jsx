"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../products/products";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    let unsubscribe;

    const setupWishlistListener = async () => {
      if (user) {
        const userRef = doc(db, "wishlists", user.uid);
        unsubscribe = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const wishlistItems = doc.data().items || [];
            setWishlist(wishlistItems);
          } else {
            setWishlist([]);
          }
        }, (error) => {
          console.error("Error fetching wishlist from Firestore:", error);
        });
      }
    };

    if (!loading) {
      setupWishlistListener();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your wishlist.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              removeFromWishlist={() => { }} // This is now handled automatically by the listener
            />
          ))
        ) : (
          <p className="text-2xl">No items in wishlist</p>
        )}
      </div>
    </div>
  );
};

export default Wishlist;