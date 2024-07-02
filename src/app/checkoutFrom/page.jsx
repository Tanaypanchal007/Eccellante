"use client";
import React, { useEffect, useState } from "react";

const ChekoutForm = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDateTime = date.toISOString().slice(0, 10);
    setCurrentDate(formattedDateTime);
  });
  return (
    <>
      <section className="pt-28 font-main">
        <div className="flex flex-col lg:flex-row justify-around px-10 max-lg:px-5 max-md:px-3">
          <div className="w-full xl-w-3/5 px-10 max-lg:px-0">
            <div className="shadow-3xl">
              <h1 className="bg-950 text-white px-5 py-[10px] text-xl">
                User Information
              </h1>
              <form className="p-7">
                <div className="flex flex-col mt-1">
                  <label htmlFor="" className="text-lg">
                    Name
                  </label>
                  <input
                    type="text"
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
                    <p>2</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Total Discount</p>
                    <p>₹599</p>
                  </div>
                  <div className="flex justify-between mt-3 pt-2 border-t-2 border-950">
                    <p>Total Price</p>
                    <p>₹2999</p>
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
