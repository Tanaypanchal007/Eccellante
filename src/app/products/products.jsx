// components/ProductCard.js
"use client";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({ product }) => {
  const Router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (product && product.id) {
      try {
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isProductWishlisted = wishlist.some(
          (item) => item.id === product.id
        );
        setIsWishlisted(isProductWishlisted);
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }
  }, [product]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!product || !product.id) {
      return;
    }

    try {
      let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      if (isWishlisted) {
        wishlist = wishlist.filter((item) => item.id !== product.id);
        setIsWishlisted(false);
      } else {
        wishlist.push(product);

        setIsWishlisted(true);
      }

      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => {
        if (product && product.id) {
          Router.push(`/product/${product.id}`);
        }
      }}
    >
      <div className="relative h-80 overflow-hidden rounded-t-lg">
        {product && product.image && (
          <Image
            src={product.image}
            width={300}
            height={192}
            alt={product.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
          />
        )}
        {product && product.discount && (
          <div className="absolute top-2 right-2 text-xs bg-gray-900 text-white px-2 py-1 rounded-full">
            {product.discount}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold">{product && product.name}</h2>
          <div onClick={handleWishlist}>
            {isWishlisted ? (
              <FaHeart className="text-xl cursor-pointer text-red-600" />
            ) : (
              <FaRegHeart className="text-xl cursor-pointer text-gray-600 hover:text-gray-800" />
            )}
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 h-10">
          {product && product.description}
        </p>

        <div className="flex gap-2 h-9">
          {product && product.sizes && product.sizes.length > 0 ? (
            product.sizes.map((size) => (
              <button
                key={size}
                className="px-3 py-1 border border-gray-300 rounded text-sm w-14 h-8 hover:bg-gray-200"
              >
                {size}
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-500">No sizes available</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-baseline">
            <p className="text-black text-xl font-semibold">
              ₹{product && product.price}
            </p>
            {product && product.oldPrice && (
              <del className="text-gray-400 text-sm">₹{product.oldPrice}</del>
            )}
          </div>
          <div className="flex items-center text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer ">
            <FiShoppingBag className="mr-2" />
            <span>Add</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
