"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../products/products";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(wishlistItems);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter(product => product.id !== productId);
    setWishlist(updatedWishlist);
    
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  // const forceUpdateWishlist = () => {
  //   const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  //   setWishlist(updatedWishlist);
  // };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              removeFromWishlist={() => {
                removeFromWishlist(product.id);
                // forceUpdateWishlist(); 
              }}
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
