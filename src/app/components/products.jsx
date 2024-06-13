"use client"
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <section className="font-main max-w-xs border-2 border-gray-100 rounded-md cursor-pointer">
      <div className="px-2 py-1">
        {/* <div className="relative overflow-hidden">
          <Image
            src={product.image}
            width={300}
            height={100}
            alt={product.name}
            className="overflow-hidden hover:scale-110 transition-transform duration-200"
          />
          {product.discount && (
            <div className="absolute top-0 right-0 text-xs bg-gray-950 text-white px-4 py-2 rounded-full">
              {product.discount}
            </div>
          )}
        </div> */}
        <div className="flex mt-2">
          <div className="space-y-2 flex-1">
            <h2 className="text-md font-bold">{product.name}</h2>
            <p className="text-xs">{product.description}</p>
          </div>
          <div className="flex items-start">
            <FaRegHeart className="text-xl" />
          </div>
        </div>
        <div className="space-x-1 mt-3">
          {product.sizes.map((size) => (
            <button
              key={size}
              className="px-5 py-2 border border-gray-300 rounded text-xs"
            >
              {size}
            </button>
          ))}
        </div>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex gap-1">
            <p className="text-black font-semibold">{product.price}</p>
            <del className="text-gray-400 font-bold">{product.oldPrice}</del>
          </div>
          <div className="flex items-center text-white bg-gray-950 px-3 gap-2 py-2 rounded cursor-pointer">
            <FiShoppingBag className="-mt-1" />
            <p>Add</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
