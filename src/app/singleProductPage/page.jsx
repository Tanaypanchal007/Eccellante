"use client";

import Image from "next/image";
import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Images = ["/image-1.png", "/image-2.png", "/image-3.png", "/image-4.png"];
const Sized = ["S", "M", "L", "XL", "XXl"];

function SingleProductPage() {
  const [selectedImage, setSelectedImage] = useState(Images[0]);
  const [count, setCount] = useState(0);
  const [countError, setCountError] = useState("");
  const [imageChoose, setImageChoose] = useState(false);

  const handelToggle = () => {
    setImageChoose(!imageChoose);
  };
  const countHandleIncrement = () => {
    setCount(count + 1);
    setCountError(" ");
  };

  const countHandleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
      setCountError("The Product Quantity cannot be less than 0");
      setTimeout(() => {
        setCountError(" ");
      }, 3000);
    }
  };

  return (
    <section className="pt-28 px-10 font-main">
      <div className="flex gap-28 justify-center max-lg:flex-col">
        <div className="flex max-md:flex-col-reverse">
          <div
            className={`flex flex-col max-md:flex-row max-md:gap-6 gap-4 max-md:mt-5 `}
          >
            {Images.map((image, index) => (
              <Image
                key={index}
                src={image}
                width={500} // Adjust size based on design requirements
                height={500}
                alt={`Thumbnail ${index + 1}`}
                className={`cursor-pointer w-[130px] h-[158px] max-md:w-[90px] max-md:h-[113px] ${
                  selectedImage === image
                    ? "border-2 border-gray-400"
                    : "opacity-50 border-2 border-gray-200"
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
          <div className="ml-10 max-md:ml-0 relative h-[683px] w-[500px] overflow-hidden max-md:h-[500px] max-md:w-[430px]">
            <Image
              src={selectedImage}
              alt="Selected"
              layout="fill"
              className="object-cover border-2 border-gray-400" // Ensuring image scales and covers the area
            />
          </div>
        </div>
        <div className="w-[30%] max-lg:w-[90%]">
          <p className="text-4xl font-bold max-md:text-2xl">
            Clasic eccellantré
          </p>
          <p className="text-xl font-medium text-400 mt-1">Overside T-shirt</p>
          <hr className="mt-2" />
          {/* ----------------------------------------------------- */}
          <p className="mt-3 text-xl max-lg:text-lg max-md:text-sm">
            The red oversized t-shirt offers a relaxed fit, perfect for a
            casual, laid-back style. Its vibrant hue adds a bold pop of color to
            any outfit, making it a versatile wardrobe staple.
          </p>

          <p className="mt-4 text-2xl font-bold"> ₹ 1,099</p>
          <p className="text-xs text-400">(MRP inclusive all taxes)</p>
          {/* ----------------------------------------------------- */}
          <p className="mt-6 text-xl font-bold">Select Size</p>
          <div className="flex gap-3 mt-5">
            {Sized.map((size, index) => (
              <button
                key={index}
                className="px-3 py-1 border border-gray-500 rounded text-sm w-20 h-10 hover:bg-gray-200 active:bg-gray-300 focus:outline-none  focus:bg-gray-900 focus:text-white transition"
              >
                {size}
              </button>
            ))}
          </div>
          {/* ----------------------------------------------------- */}
          <p className="mt-6">Select Quantity</p>
          <div className="flex items-center mt-5 ">
            <button
              className="bg-900 px-4 py-2 text-xl text-white rounded-s"
              onClick={countHandleIncrement}
            >
              +
            </button>
            <p className="px-10 border-[2px] py-2 border-900">{count}</p>
            <button
              className="bg-900 px-4 py-2  text-xl text-white rounded-e"
              onClickCapture={countHandleDecrement}
            >
              -
            </button>
          </div>
          <p className="mt-1 font-bold">{countError}</p>

          {/* ----------------------------------------------------- */}
          <button className="flex items-center justify-center gap-2 border border-gray-900 w-full py-[12px] mt-6 text-xl rounded font-semibold">
            <FaRegHeart />
            <p>Add to Wishlist</p>
          </button>
          {/* ----------------------------------------------------- */}
          <button className="flex gap-2 items-center justify-center w-full border border-gray-900 mt-5 py-[12px] text-xl bg-950 rounded text-white font-semibold">
            <FiShoppingCart />
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
