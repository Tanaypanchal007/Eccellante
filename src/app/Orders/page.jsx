"use client"
import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import Image from 'next/image';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersCollection = collection(db, 'orders');
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersList = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersList);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders(orders.filter(order => order.id !== orderId));
      closeModal();
    } catch (error) {
      console.error("Error deleting order: ", error);
    }
  };

  const ImageOrPlaceholder = ({ src, alt, ...props }) => {
    if (src) {
      return <Image src={src} alt={alt} {...props} />;
    } else {
      return (
        <div className="flex items-center justify-center bg-gray-200 text-gray-500 text-sm" {...props}>
          No Image
        </div>
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Order #{order.orderId}</h2>
              <p className="text-gray-600 mb-4">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Items:</h3>
                <div className="grid grid-cols-2 gap-2">
                  {order.items.slice(0, 4).map((item, index) => (
                    <div key={index} className="relative w-full pt-[100%]">
                      <ImageOrPlaceholder
                        src={item.image}
                        alt={item.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                  ))}
                </div>
                {order.items.length > 4 && (
                  <p className="text-sm text-gray-500 mt-2">+{order.items.length - 4} more items</p>
                )}
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="text-lg font-bold">₹{order.amount}</span>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-between">
              <button
                onClick={() => handleViewDetails(order)}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                View Details
              </button>
              <button
                onClick={() => handleDeleteOrder(order.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete Order
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Order Details</h2>
              <p className="mb-2"><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
              <p className="mb-4"><strong>Total Amount:</strong> ₹{selectedOrder.amount}</p>

              <h3 className="font-semibold mb-2">Items:</h3>
              <ul className="mb-4">
                {selectedOrder.items.map((item, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <ImageOrPlaceholder
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      objectFit="cover"
                      className="rounded-md mr-2"
                    />
                    <span>{item.name} - Quantity: {item.quantity} - ₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-semibold mb-2">Shipping Details:</h3>
              <p>{selectedOrder.userInfo?.name}</p>
              <p>{selectedOrder.userInfo?.address}</p>
              <p>{selectedOrder.userInfo?.contactNumber}</p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-between">
              <button
                onClick={() => handleDeleteOrder(selectedOrder.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete Order
              </button>
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}