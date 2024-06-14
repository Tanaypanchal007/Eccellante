"use client";

import { useState } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import React, { useEffect} from "react";
import ProductCard from "../components/products";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import your firebase config

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}
export default function Product() {
  const [selectedView, setSelectedView] = useState(2);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromFirestore();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  return (
    <section className="pt-[80px] font-main">
      {/* Banner Start Here */}
      <div className="relative w-full">
        <Image
          src="/shop-banner.jpg"
          height={900}
          width={1000}
          className="w-full"
          alt="Shop Banner"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-left pl-10">
          <p className="text-7xl font-semibold tracking-widest text-white">
            The Latest <br /> Unisex Trends..
          </p>
        </div>
      </div>
      {/* Banner End Here */}
      {/* Products title and Grid View Option start here */}
      <div className="flex justify-between items-center px-20 py-5 border-b-[1px] border-600 mb-10">
        <div className="text-2xl font-semibold">Products</div>
        <div className="text-5xl flex gap-4">
          {/* Dynamic image source selection based on the selected view */}

          <Image
            src={selectedView === 1 ? "/grid-view-2.svg" : "/grid-2.svg"}
            width={60}
            height={60}
            className="cursor-pointer"
            alt="Grid View 2"
            onClick={() => handleViewChange(1)}
          />

          <Image
            src={selectedView === 2 ? "/grid-view-3.svg" : "/grid-3.svg"}
            width={60}
            height={60}
            className="cursor-pointer"
            alt="Grid View 3"
            onClick={() => handleViewChange(2)}
          />
          <Image
            src={selectedView === 3 ? "/grid-view-4.svg" : "/grid-4.svg"}
            width={60}
            height={60}
            className="cursor-pointer"
            alt="Grid View 4"
            onClick={() => handleViewChange(3)}
          />
        </div>
      </div>
      {/* Products title and Grid View Option End here */}

      {/* products filter and products cards start here*/}
      <div className="flex px-20 mb-10">
        <div className="w-[17%] pr-5 border-500 border-r-[2px]">
          <div className="border-b-[2px] border-500 pb-7">
            <h3 className="text-xl font-semibold">CATEGORY</h3>
            <ul className="space-y-2">
              {[
                "Oversized T shirt",
                "Hoodies",
                "T shirts",
                "Anime T shirts",
              ].map((category, index) => (
                <li key={index} className="text-xl mt-3 flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${index}`}
                    name="category"
                    value={category}
                    className="w-6 h-6 cursor-pointer rounded-md border-2 border-gray-400 transition-colors checked:bg-blue-500"
                  />
                  <label className="ml-2" htmlFor={`category-${index}`}>
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold pt-7">PRICE</h3>
            <ul className="space-y-2">
              {[
                "599-699",
                "699-799",
                "799-899",
                "899-999",
                "1099-1199",
                "1199-2099",
                "2099-3099",
              ].map((price, index) => (
                <li key={index} className="mt-3 text-xl flex items-center">
                  <input
                    type="checkbox"
                    id={`price-${index}`}
                    name="price"
                    value={price}
                    className="w-6 h-6 cursor-pointer rounded-md border-2 border-gray-400 transition-colors checked:bg-blue-500"
                  />
                  <label className="ml-2" htmlFor={`price-${index}`}>
                    {price}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative w-full px-10">
          <div>
            <input
              type="text"
              placeholder="Search among products..."
              className=" w-full px-16 py-5 outline-none  text-xl rounded-full bg-50 "
            />
            <IoSearchOutline className="text-3xl absolute top-5 left-16" />
          </div>
          <div className="container mx-auto px-4 py-10 font-main">
  
      <div className="grid grid-cols-1 max-sm:px-14 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    
    </div>
        </div>
      </div>
    </section>
  );
}
