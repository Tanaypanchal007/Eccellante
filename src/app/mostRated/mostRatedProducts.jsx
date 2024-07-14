"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Aos from "aos";
import { useRouter } from "next/navigation";
import "aos/dist/aos.css";

const MostRatedProducts = ({ product }) => {
  const router = useRouter();
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section
      className="font-main rounded-md cursor-pointer"
      data-aos-anchor-placement="bottom-bottom"
    >
      <div>
        <div
          className="relative max-sm:w-fit"
          onClick={() => {
            if (product && product.id) {
              router.push(`/product/${product.id}`);
            }
          }}
        >
          {product.image && (
            <div className="w-full h-[480px] max-sm:h-[200px] overflow-hidden rounded-t-md">
              <Image
                src={product.image}
                width={300}
                height={200}
                alt={product.name}
                className="object-cover w-full h-full max-sm:w-[200px] max-sm:h-[260px] hover:scale-105 transition-transform duration-200"
              />
            </div>
          )}
          {product.discount && (
            <div className="absolute top-2 right-1 text-xs bg-gray-950 text-white px-4 py-2 rounded-full max-sm:text-[10px] max-sm:py-1 max-sm:px-2 max-sm:top-[5px] max-sm:right-[5px]">
              {product.discount}
            </div>
          )}
        </div>
        <div className="flex mt-2">
          <div className="space-y-2 flex-1">
            <h2 className="text-md font-bold max-sm:text-[13px]">
              {product.name}
            </h2>
            <p className="text-sm max-sm:text-[10px] text-gray-600 line-clamp-2 h-10">
              {product && product.description}
            </p>{" "}
          </div>
          {/* <div className="flex items-start gap-1">
          <FaStar className="text-xl mt-1" />
          <p className="text-xl font-bold">4.5</p>
        </div> */}
        </div>
        <div className="flex justify-between mt-3 items-center">
          <div className="flex gap-1">
            <p className="text-black font-semibold max-sm:text-sm">
              ₹{product.price}
            </p>
            {product.oldPrice && (
              <del className="text-gray-400 font-bold max-sm:text-xs">
                ₹{product.oldPrice}
              </del>
            )}
          </div>
          {/* <Link href="/products">
          <div className="flex items-center text-white bg-gray-950 px-3 gap-2 py-2 rounded cursor-pointer">
            <FiShoppingBag className="-mt-1" />
            <p>Add</p>
          </div>
        </Link> */}
        </div>
      </div>
    </section>
  );
};

export default MostRatedProducts;
