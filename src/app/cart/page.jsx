"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";

const Sizes = ["S", "M", "L", "XL", "XXL"];
function page() {
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Load cart items from localStorage on component mount
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
    updateCartSummary(savedCart);
  }, []);

  const updateCartSummary = (cart) => {
    // Calculate total items and total price
    let total = 0;
    let price = 0;
    cart.forEach((item) => {
      total += item.quantity;
      price += item.price * item.quantity;
    });
    setTotalItems(total);
    setTotalPrice(price);
  };

  const handleIncrement = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity++;
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartSummary(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity--;
      setCartItems(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      updateCartSummary(updatedCart);
    }
  };

  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCartSummary(updatedCart);
  };

  const handleCheckout = () => {
    // Perform checkout logic here, e.g., redirect to checkout page
    Swal.fire({
      icon: "success",
      title: "Checkout Successful!",
      text: "Thank you for shopping with us.",
    });
    // Clear cart after successful checkout
    setCartItems([]);
    setTotalItems(0);
    setTotalPrice(0);
    localStorage.removeItem("cart");
  };

  return (
    <section className="pt-28 font-main">
      <div className="flex justify-evenly flex-col sm:flex-row">
        <div className="w-full sm:w-auto px-4 sm:px-0">
          {cartItems.length === 0 ? (
            <p className="text-2xl">No items in cart</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-center relative mb-5 max-sm:border-2"
              >
                <div className="w-full sm:w-auto flex justify-center sm:justify-start">
                  <Image
                    src={item.image}
                    height={200}
                    width={200}
                    alt={item.name}
                    className="rounded-md cursor-pointer border-2 max-sm:border-0"
                  />
                </div>
                <div className="w-full sm:w-auto space-y-3 px-4 py-4 sm:py-[12px] border-2 border-l-0 max-sm:border-0 sm:rounded-e-md">
                  <p className="text-2xl font-bold">{item.name}</p>
                  <p>{item.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {Sizes.map((size, index) => (
                      <p
                        key={index}
                        className="h-9 w-20 border-2 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200"
                      >
                        {size}
                      </p>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <p className="text-xl font-semibold">₹{item.price}</p>
                      {item.oldPrice && (
                        <del className="text-xl font-semibold text-gray-400">
                          ₹{item.oldPrice}
                        </del>
                      )}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleIncrement(index)}
                        className="bg-gray-950 px-4 py-2 text-white text-xl rounded-s-md"
                      >
                        +
                      </button>
                      <span className="px-9 border-2 py-2 border-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleDecrement(index)}
                        className="bg-gray-950 px-4 py-2 text-white text-xl rounded-e-md"
                      >
                        -
                      </button>
                    </div>
                  </div>
                  <div
                    onClick={() => handleRemove(index)}
                    className="absolute top-0 right-5 text-xl cursor-pointer"
                  >
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {cartItems.length > 0 && (
        <div className="flex justify-center mt-8 px-4 sm:px-0">
          <div className="space-y-3 px-7 py-[12px] border-2 rounded-md">
            <p className="text-2xl font-bold">Cart Summary</p>
            <p>Total Items: {totalItems}</p>
            <p>Total Price: ₹{totalPrice}</p>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default page;
