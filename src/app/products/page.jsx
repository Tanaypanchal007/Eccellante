"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import ProductCard from "./products";
import { FaBars } from "react-icons/fa";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import your firebase config
import { fetchDataFromFirestore } from "../Utils/firebaseutil";

export default function Product() {
  const [selectedView, setSelectedView] = useState(2);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [open, setOpen] = useState(false); // Fixed the state variable name here

  const handleFilterMenu = () => {
    setOpen(!open); // Fixed the function name here
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromFirestore("eccellante");
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setSelectedPriceRanges((prev) =>
      prev.includes(value)
        ? prev.filter((range) => range !== value)
        : [...prev, value]
    );
  };

  // Filter products based on search query and selected price ranges
  const filteredProducts = userData.filter((product) => {
    const matchesSearchQuery = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriceRange =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const [min, max] = range.split("-").map(Number);
        return product.price >= min && product.price <= max;
      });
    return matchesSearchQuery && matchesPriceRange;
  });

  return (
    <section className="pt-[80px] font-main ">
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
      <div className="flex justify-between items-center px-20 max-lg:pl-3 max-lg:pr-9 max-sm:pr-8 max-md:px-5 py-5 sticky top-[10px]  max-lg:top-[70px] z-40 bg-50 max-xl:w-full border-b-[1px] border-600 mb-10">
        <div className="text-2xl font-semibold ">Products</div>
        <div>
          <FaBars className="text-2xl xl:hidden" onClick={handleFilterMenu} />
        </div>
      </div>
      {/* Products title and Grid View Option End here */}

      {/* products filter and products cards start here */}
      <div className="flex flex-col xl:flex-row px-20 max-lg:px-0 mb-10 relative ">
        <div
          className={`w-full xl:w-[25%] pr-5 border-500 xl:border-r-[2px] sticky top-20 h-[calc(100vh-120px)] max-xl:fixed overflow-y-auto max-xl:bg-white max-xl:shadow-lg transition-transform max-xl:top-[80px] py-10 ${open ? "max-xl:right-0" : "max-xl:right-[-100%]"
            } max-xl:z-40 max-lg:px-0 transition-all duration-500`}
        >
          <div className="border-b-[2px] border-500 pb-7 px-1 max-lg:px-10 max-xl:px-5">
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
                    onClick={handleFilterMenu}
                  />
                  <label className="ml-2" htmlFor={`category-${index}`}>
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="px-1 max-lg:px-10 max-xl:px-5">
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
                    onChange={handlePriceRangeChange}
                    onClick={handleFilterMenu}
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

        <div className="relative w-full xl:pl-10">
          <div className="px-5">
            <input
              type="text"
              placeholder="Search among products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className=" w-full px-16 py-5 outline-none text-xl max-lg:text-lg rounded-full bg-50 "
            />
            <IoSearchOutline className="text-3xl absolute top-5 max-xl:left-10 left-[80px]" />
          </div>
          <div className="container mx-auto px-4 py-10 font-main">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500">
                  No products found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
