// src/app/components/ProductCard.jsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const ProductCard = ({ product, removeFromWishlist }) => {
  const router = useRouter();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (product && product.id && user) {
        try {
          const userRef = doc(db, "wishlists", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const wishlist = userSnap.data().items || [];
            const isProductWishlisted = wishlist.some(
              (item) => item.id === product.id
            );
            setIsWishlisted(isProductWishlisted);
          }
        } catch (error) {
          console.error("Error fetching wishlist from Firestore:", error);
        }
      }
    };
    fetchWishlist();
  }, [product, user]);

  const handleWishlist = async (e) => {
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
      const userRef = doc(db, "wishlists", user.uid);
      const userSnap = await getDoc(userRef);

      // Check if the document exists
      if (!userSnap.exists()) {
        // If it doesn't exist, create it with an empty 'items' array
        await setDoc(userRef, { items: [] });
      }

      // Now update the wishlist based on current state
      if (isWishlisted) {
        await updateDoc(userRef, {
          items: arrayRemove(product),
        });
        setIsWishlisted(false);
        Swal.fire({
          icon: "success",
          title: "Removed from Wishlist",
          text: "Item has been removed from your wishlist.",
        });
      } else {
        await updateDoc(userRef, {
          items: arrayUnion(product),
        });
        setIsWishlisted(true);
        Swal.fire({
          icon: "success",
          title: "Added to Wishlist",
          text: "Item has been added to your wishlist.",
        });
      }
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };


  useEffect(() => {
    const fetchCart = async () => {
      if (product && product.id && user) {
        try {
          const userRef = doc(db, "carts", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const cart = userSnap.data().items || [];
            const isProductInCart = cart.some((item) => item.id === product.id);
            setIsInCart(isProductInCart);
          }
        } catch (error) {
          console.error("Error fetching cart from Firestore:", error);
        }
      }
    };
    fetchCart();
  }, [product, user]);

  // ... (keep existing handleWishlist function)

  const handleAddToCart = async (e) => {
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
          router.push("/sign-in");
        }
      });
      return;
    }

    if (!product || !product.id) {
      return;
    }

    try {
      const userRef = doc(db, "carts", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, { items: [] });
      }

      if (isInCart) {
        await updateDoc(userRef, {
          items: arrayRemove({ ...product, quantity: 1 }),
        });
        setIsInCart(false);
        Swal.fire({
          icon: "success",
          title: "Removed from Cart",
          text: "Item has been removed from your cart.",
        });
      } else {
        await updateDoc(userRef, {
          items: arrayUnion({ ...product, quantity: 1 }),
        });
        setIsInCart(true);
        Swal.fire({
          icon: "success",
          title: "Added to Cart",
          text: "Item has been added to your cart.",
        });
      }
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 max-sm:p-0 flex flex-col gap-4 max-sm:gap-1 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => {
        if (product && product.id) {
          router.push(`/product/${product.id}`);
        }
      }}
    >
      <div className="relative">
        <div className="relative h-[260px] sm:h-[420px] md:h-[420px] lg:h-[480px] xl:h-[330px] 2xl:h-[440px] overflow-hidden rounded-t-lg">
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
        <div className="max-sm:px-2 flex flex-col gap-2 max-sm:gap-1 my-2">
          <div className="flex justify-between items-start">
            <h2 className="text-lg font-bold pr-4 max-sm:text-[12px]">
              {product && product.name}
            </h2>
            <div
              onClick={handleWishlist}
              className="max-sm:absolute max-sm:top-2 max-sm:right-2"
            >
              {isWishlisted ? (
                <FaHeart className="text-xl cursor-pointer text-red-600" />
              ) : (
                <FaRegHeart className="text-xl cursor-pointer text-gray-700 hover:text-gray-800" />
              )}
            </div>
          </div>
          <p className="text-sm max-sm:text-[10px] text-gray-600 line-clamp-2 h-10">
            {product && product.description}
          </p>
        </div>
        {/* <div className="flex gap-2 h-9">
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
        </div> */}

        <div className="flex justify-between items-left max-sm:flex-col max-sm:gap-1 max-sm:mb-2 max-sm:px-2">
          <div className="flex gap-2 items-baseline">
            <p className="text-black text-xl font-semibold max-sm:text-sm">
              ₹{product && product.price}
            </p>
            {product && product.oldPrice && (
              <del className="text-gray-400 text-sm">₹{product.oldPrice}</del>
            )}
          </div>
          {/* <div
            className="flex items-center text-white bg-gray-900 px-4 max-sm:px-2 max-sm:py-[6px] py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer max-sm:w-[90px] max-sm:mb-2"
            onClick={handleAddToCart}
          >
            <FiShoppingBag className="mr-2" />
            <span>{isInCart ? "Remove" : "Add"}</span>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
