"use client";
import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

const MostRatedProducts = ({ product }) => {
  return (
    <section className="font-main max-w-xs border-2 border-gray-100 rounded-md cursor-pointer">
      <div className="px-2 py-3">
        <div className="relative">
          {product.image && (
            <div className="w-full h-72 overflow-hidden rounded-t-md">
              <Image
                src={product.image}
                width={300}
                height={192}
                alt={product.name}
                className="object-cover w-full h-full hover:scale-105 transition-all duration-200"
              />
            </div>
          )}
          {product.discount && (
            <div className="absolute top-0 right-0 text-xs bg-gray-950 text-white px-4 py-2 rounded-full">
              {product.discount}
            </div>
          )}
        </div>
        <div className="flex mt-2">
          <div className="space-y-2 flex-1">
            <h2 className="text-md font-bold">{product.name}</h2>
            <p className="text-xs">{product.description}</p>
          </div>
          <div className="flex items-start gap-1">
            <FaStar className="text-xl mt-1" />
            <p className="text-xl font-bold "> 4.5</p>
          </div>
        </div>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex gap-1">
            <p className="text-black font-semibold">{product.price}</p>
            {product.oldPrice && (
              <del className="text-gray-400 font-bold">{product.oldPrice}</del>
            )}
          </div>
          <Link href="/products">
            <div className="flex items-center text-white bg-gray-950 px-3 gap-2 py-2 rounded cursor-pointer">
              <FiShoppingBag className="-mt-1" />
              <p>Add</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MostRatedProducts;