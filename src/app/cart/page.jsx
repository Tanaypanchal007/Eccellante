"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";
import { doc, onSnapshot, updateDoc, arrayRemove } from "firebase/firestore";
import { useRouter } from "next/navigation";
const Sizes = ["S", "M", "L", "XL", "XXL"];
const carts = () => {
  const [user, loading] = useAuthState(auth);
  const [cartItems, setCartItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

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

  useEffect(() => {
    let unsubscribe;

    const setupCartListener = async () => {
      if (user) {
        const userRef = doc(db, "carts", user.uid);
        unsubscribe = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const cart = doc.data().items || [];
            setCartItems(cart);
            updateCartSummary(cart);
          } else {
            setCartItems([]);
            updateCartSummary([]);
          }
        }, (error) => {
          console.error("Error fetching cart from Firestore:", error);
        });
      }
    };

    if (!loading) {
      setupCartListener();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, loading]);

  const updateCartSummary = (cart) => {
    let total = 0;
    let price = 0;
    cart.forEach((item) => {
      total += item.quantity;
      price += item.price * item.quantity;
    });
    setTotalItems(total);
    setTotalPrice(price);
  };

  const updateQuantity = async (index, newQuantity) => {
    if (newQuantity < 1) return;

    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;

    try {
      const userRef = doc(db, "carts", user.uid);
      await updateDoc(userRef, { items: updatedCart });
    } catch (error) {
      console.error("Error updating cart in Firestore:", error);
    }
  };

  const handleRemove = async (index) => {
    console.log("remove");
    const itemToRemove = cartItems[index];
    try {
      const userRef = doc(db, "carts", user.uid);
      await updateDoc(userRef, {
        items: arrayRemove(itemToRemove),
      });
    } catch (error) {
      console.error("Error removing item from cart in Firestore:", error);
    }
  };

  const handleCheckout = () => {
    const queryParams = new URLSearchParams({
      cartItems: JSON.stringify(cartItems),
      totalItems: totalItems.toString(),
      totalPrice: totalPrice.toString(),
      // You can calculate the discount here if needed
      totalDiscount: "0" // Replace with actual discount calculation
    }).toString();

    router.push(`/checkoutFrom?${queryParams}`);
  };
  // const handleCheckout = async () => {
  //   const options = {
  //     key: "rzp_test_DwNfgfRaelZuOF", // Replace with your Razorpay key
  //     amount: totalPrice * 100, // Razorpay expects amount in paise
  //     currency: "INR",
  //     name: "Your Company Name",
  //     description: "Purchase Description",
  //     handler: async function (response) {
  //       try {
  //         // Add order to Firebase
  //         const docRef = await addDoc(collection(db, "orders"), {
  //           orderId: response.razorpay_payment_id,
  //           amount: totalPrice,
  //           items: cartItems,
  //           timestamp: new Date(),
  //         }); e

  //         Swal.fire({
  //           icon: "success",
  //           title: "Payment Successful!",
  //           text: "Your order has been placed.",
  //         });

  //         // Clear cart after successful checkout
  //         setCartItems([]);
  //         setTotalItems(0);
  //         setTotalPrice(0);
  //         localStorage.removeItem("cart");
  //       } catch (error) {
  //         console.error("Error adding document: ", error);
  //         Swal.fire({
  //           icon: "error",
  //           title: "Oops...",
  //           text: "Something went wrong!",
  //         });
  //       }
  //     },
  //     prefill: {
  //       name: "Meghana",
  //       email: "customer@example.com",
  //       contact: "8140628151",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };

  //   const rzp1 = new window.Razorpay(options);
  //   rzp1.open();
  // };

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // ... (keep your existing useEffect logic)

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your cart.</div>;
  }
  return (
    <section className="pt-28 font-main">
      <div className="flex flex-col lg:flex-row justify-around">
        <div className="w-full  lg:w-3/5 px-4 sm:px-8">
          {cartItems.length === 0 ? (
            <p className="text-2xl text-center">No items in cart</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col sm:flex-row items-center justify-between border-2 rounded-md mb-5 p-4"
              >
                <div className="w-full sm:w-1/3 flex justify-center sm:justify-start mb-4 sm:mb-0">
                  <Image
                    src={item.image}
                    height={200}
                    width={200}
                    alt={item.name}
                    className="rounded-md border-2 h-[200px] max-sm:border-0"
                  />
                </div>
                <div className="w-full sm:w-2/3 space-y-3 px-4 sm:px-8">
                  <p className="text-2xl font-bold">{item.name}</p>
                  <p>{item.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {item.selectedSize && (
                      <p className="h-9 w-20 border-2 flex items-center justify-center rounded">
                        Size: {item.selectedSize}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <p className="text-xl font-semibold">₹{item.price}</p>
                      {item.oldPrice && (
                        <del className="text-xl font-semibold text-gray-400">
                          ₹{item.oldPrice}
                        </del>
                      )}
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="bg-gray-950 px-4 py-2 text-white text-xl rounded-s-md"
                      >
                        -
                      </button>
                      <span className="px-9 border-2 py-2 border-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleIncrement(index)}
                        className="bg-gray-950 px-4 py-2 text-white text-xl rounded-e-md"
                      >
                        +
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
        {cartItems.length > 0 && (
          <div className="w-full  lg:w-1/4 px-4 sm:px-8">
            <div className="space-y-3 px-7 sticky top-[100px] py-6 border-2 rounded-md">
              <p className="text-2xl font-bold text-center">Cart Summary</p>
              <div className="border-b-2 pb-3">
                <div className="flex justify-between items-center">
                  <p className="text-xl">Total Items</p>
                  <p className="text-xl">{totalItems}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-xl">Total Price</p>
                  <p className="text-xl">₹{totalPrice}</p>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                // onClick={() => router.push("/checkoutFrom")}
                className="bg-gray-950 hover:bg-gray-900 text-white px-5 py-2 rounded-md w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default carts;
