"use client"
import React, { useState, useEffect } from "react";
import ProductCard from "../components/products";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

function MostRated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/user/route")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 font-main">
      <h1 className="text-4xl text-center mb-16 border-b-4 w-[230px] px-2 font-bold pb-4 m-auto border-950">
        Most Rated
      </h1>
      <div className="grid grid-cols-1 max-sm:px-14 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-7">
        <Link href="" className="flex font-bold rounded items-center border-2 border-950 p-2">
          Explore More <HiOutlineArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default MostRated;
