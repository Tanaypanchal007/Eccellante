// src/app/components/ProductCard.jsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// import { useRouter } from "next/";
import Swal from "sweetalert2";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

const ProductCard = ({ product, removeFromWishlist }) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (product && product.id && user) {
      try {
        const wishlist =
          JSON.parse(localStorage.getItem("wishlistItems")) || [];
        const isProductWishlisted = wishlist.some(
          (item) => item.id === product.id
        );
        setIsWishlisted(isProductWishlisted);
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      }
    }
  }, [product, user]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      Swal.fire({
        title: "Please log in",
        text: "You need to be logged in to add items to your wishlist.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/sign-in");
        }
      });
      return;
    }

    if (!product || !product.id) {
      return;
    }

    try {
      let wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];

      if (isWishlisted) {
        wishlist = wishlist.filter((item) => item.id !== product.id);
        setIsWishlisted(false);
        Swal.fire({
          icon: "success",
          title: "Removed from Wishlist",
          text: "Item has been removed from your wishlist.",
        });
      } else {
        wishlist.push(product);
        setIsWishlisted(true);
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          text: "Item has been added to your wishlist.",
        });
      }

      localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!user) {
      Swal.fire({
        title: "Please log in",
        text: "You need to be logged in to add items to your cart.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/sign-in"); // Replace with your login page route
        }
      });
      return;
    }

    if (!product || !product.id) {
      return;
    }

    try {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      const existingItem = cart.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: "Item has been added to your cart.",
      });
    } catch (error) {
      console.error("Error updating localStorage:", error);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200 "
      onClick={() => {
        if (product && product.id) {
          router.push(`/product/${product.id}`);
        }
      }}
    >
      <div className="relative h-[480px] sm:h-[420px] md:h-[420px] lg:h-[480px] xl:h-[330px] 2xl:h-[440px] overflow-hidden rounded-t-lg p-2">
        {product && product.image && (
          <Image
            src={product.image}
            width={300}
            height={192}
            alt={product.name}
            className="object-cover w-full h- hover:scale-105 transition-transform duration-200"
          />
        )}
        {product && product.discount && (
          <div className="absolute top-2 right-2 text-xs bg-gray-900 text-white px-2 py-1 rounded-full">
            {product.discount}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[6px] px-3 py-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold pr-4">{product && product.name}</h2>
          <div onClick={handleWishlist}>
            {isWishlisted ? (
              <FaHeart className="text-xl cursor-pointer text-red-600" />
            ) : (
              <FaRegHeart className="text-xl cursor-pointer text-gray-600 hover:text-gray-800" />
            )}
          </div>
        </div>
        <p>{product.label}</p>
        <p className="text-sm text-gray-600 line-clamp-2 h-10 ">
          {product && product.description}
        </p>
        <div className="flex gap-2 h-9">
          {product && product.sizes && product.sizes.length > 0 ? (
            product.sizes.length > 5 ? (
              <div>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm w-10 h-8 hover:bg-gray-200 mr-1">
                  XS
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm w-10 h-8 hover:bg-gray-200 mr-1">
                  S
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm w-10 h-8 hover:bg-gray-200 mr-1">
                  M
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm w-10 h-8 hover:bg-gray-200 mr-1">
                  L
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm w-10 h-8 hover:bg-gray-200 mr-1">
                  ++
                </button>
              </div>
            ) : (
              product.sizes.map((size, index) => (
                <button
                  key={index} // use index as key if sizes can be duplicated
                  className="px-3 py-1 border border-gray-300 rounded text-sm w-14 h-8 hover:bg-gray-200"
                >
                  {size}
                </button>
              ))
            )
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
          <div
            className="flex items-center text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={handleAddToCart}
          >
            <FiShoppingBag className="mr-2" />
            <span>Add</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
