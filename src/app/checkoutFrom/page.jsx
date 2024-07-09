"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { auth, db } from "../firebaseConfig"; // Make sure to import your Firebase config
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";
// import { auth, db } from "../firebaseConfig";
import {query, where, getDocs, deleteDoc } from "firebase/firestore";
const ChekoutForm = () => {
  const [user] = useAuthState(auth);
  // const [currentDate, setCurrentDate] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
  });

  const searchParams = useSearchParams();
  useEffect(() => {
    const date = new Date();
    const formattedDateTime = date.toISOString().slice(0, 10);
    setCurrentDate(formattedDateTime);
    setTotalItems(Number(searchParams.get("totalItems") || 0));
    setTotalPrice(Number(searchParams.get("totalPrice") || 0));
    setTotalDiscount(Number(searchParams.get("totalDiscount") || 0));
  }, [searchParams]);

 // Add the new useEffect here, right after the existing one
 useEffect(() => {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay SDK loaded successfully');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  loadRazorpay().then((success) => {
    if (!success) {
      console.error('Razorpay SDK failed to load. Payment functionality may not work.');
    }
  });
}, []);
  // const handleProocedTOPay = async () => {
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


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleProocedToPay = async (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: "Please log in to proceed with the payment.",
      });
      return;
    }

    if (typeof window.Razorpay === 'undefined') {
      console.error('Razorpay SDK is not loaded');
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Payment gateway is not available. Please try again later.",
      });
      return;
    }

    const options = {
      key: "rzp_test_DwNfgfRaelZuOF", // Replace with your Razorpay key
      amount: totalPrice * 100, // Razorpay expects amount in paise
      currency: "INR",
      name: "Your Company Name",
      description: "Purchase Description",
      handler: async function (response) {
        try {
          // Add order to Firebase
          const orderData = {
            userId: user.uid,
            orderId: response.razorpay_payment_id,
            amount: totalPrice,
            items: totalItems,
            discount: totalDiscount,
            userInfo: userInfo,
            orderDate: currentDate,
            timestamp: new Date(),
          };

          // const docRef = await addDoc(collection(db, "orders"), orderData);
          await addDoc(collection(db, "orders"), orderData);

          // Clear cart data from Firebase
          const cartRef = collection(db, "carts");
          const q = query(cartRef, where("userId", "==", user.uid));
          const querySnapshot = await getDocs(q);

          const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
          await Promise.all(deletePromises);
          setUserInfo({
            name: "",
            email: "",
            address: "",
            contactNumber: "",
          });

          // Reset totals and other fields
          setTotalItems(0);
          setTotalPrice(0);
          setTotalDiscount(0);
          setCurrentDate("");
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: "Your order has been placed.",
          });

          // Clear cart after successful checkout
          // You might want to implement this functionality
          // clearCart();
        } catch (error) {
          console.error("Error adding document: ", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.contactNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    try {
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      Swal.fire({
        icon: "error",
        title: "Payment Gateway Error",
        text: "There was an error setting up the payment. Please try again or contact support.",
      });}
  };

  return (
    <>
      <section className="pt-28 font-main">
        <div className="flex flex-col lg:flex-row justify-around px-10 max-lg:px-5 max-md:px-3">
          <div className="w-full xl-w-3/5 px-10 max-lg:px-0">
            <div className="shadow-3xl">
              <h1 className="bg-950 text-white px-5 py-[10px] text-xl">
                User Information
              </h1>
              <form className="p-7" onSubmit={handleProocedToPay}>
                <div className="flex flex-col mt-1">
                  <label htmlFor="" className="text-lg">
                    Name
                  </label>
                  <input
                   type="text"
                    name="name"
                    value={userInfo.name}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    required
                    className="border border-gray-800 outline-none w-full px-3 py-2 rounded mt-1"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <label htmlFor="" className="text-lg">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleInputChange}
                    placeholder="Enter Your Email"
                    required
                    className="border border-gray-800 outline-none w-full px-3 py-2 rounded mt-1"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <label htmlFor="" className="text-lg">
                    Full Address
                  </label>
                  <input
                      type="text"
                    name="address"
                    value={userInfo.address}
                    onChange={handleInputChange}
                    placeholder="Enter Your Address"
                    required
                    className="border border-gray-800 outline-none w-full px-3 py-2 rounded mt-1"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <label htmlFor="" className="text-lg">
                    Contact Number
                  </label>
                  <input
                   type="number"
                    name="contactNumber"
                    value={userInfo.contactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter Your Contact Number"
                    required
                    className="border border-gray-800 outline-none w-full px-3 py-2 rounded mt-1"
                  />
                </div>
                <div className="flex flex-col mt-3">
                  <label htmlFor="" className="text-lg">
                    Order Date
                  </label>
                  <input
                    readOnly
                    value={currentDate}
                    required
                    className="border border-gray-800 outline-none w-full px-3 py-2 rounded mt-1"
                  />
                </div>
                <button className="bg-950 mt-3 w-full py-2 rounded text-white">
                  Procced To Payments
                </button>
              </form>
            </div>
          </div>
          <div className="xl:w-1/4 w-full max-lg:mt-5">
            <div className="shadow-3xl">
              <div className="">
                <h1 className="bg-950 text-white px-5 py-[10px] text-lg">
                  Order Summary
                </h1>
                <div className="p-4 max-lg:p-7">
                  <div className="flex justify-between mb-2">
                    <p>Total Item</p>
                    <p>{totalItems}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Total Discount</p>
                    <p>₹{totalDiscount}</p>
                  </div>
                  <div className="flex justify-between mt-3 pt-2 border-t-2 border-950">
                    <p>Total Price</p>
                    <p>₹{totalPrice}</p>
                  </div>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ChekoutForm;
