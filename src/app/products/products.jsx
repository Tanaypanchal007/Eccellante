"use client";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
const ProductCard = ({ product }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col gap-4 cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-full overflow-hidden rounded-t-lg">
        {product.image && (
          <Image
            src={product.image}
            width={300}
            height={192}
            alt={product.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
          />
        )}
        {product.discount && (
          <div className="absolute top-2 right-2 text-xs bg-gray-900 text-white px-2 py-1 rounded-full">
            {product.discount}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <FaRegHeart
            className="text-xl cursor-pointer text-gray-600 hover:text-gray-800"
            onClick={() => {
              alert("Done This ");
            }}
          />
        </div>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes && product.sizes.length > 0 ? (
            product.sizes.map((size) => (
              <button
                key={size}
                className="px-3 py-1 border border-gray-300 rounded text-xs hover:bg-gray-200"
              >
                {size}
              </button>
            ))
          ) : (
            <p className="text-xs text-gray-500">No sizes available</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-baseline">
            <p className="text-black text-xl font-semibold">₹{product.price}</p>
            {product.oldPrice && (
              <del className="text-gray-400 text-sm">₹{product.oldPrice}</del>
            )}
          </div>
          <Link href="/products">
            <div className="flex items-center text-white bg-gray-900 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors cursor-pointer ">
              <FiShoppingBag className="mr-2" />
              <span>Add</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
