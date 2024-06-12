import React from "react";
import Image from "next/image";
import { IoGrid } from "react-icons/io5";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

export default function product() {
  return (
    <>
      <section className="pt-[80px] font-main">
        {/* Banner Start Here */}
        <div className="relative w-full">
          <Image
            src="/shop-banner.jpg"
            height={900}
            width={1000}
            className="w-full"
          ></Image>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 flex items-center justify-left pl-10">
            <p className="text-7xl font-semibold tracking-widest  text-white">
              The Latest <br /> Unisex Trends..
            </p>
          </div>
        </div>
        {/* Banner End Here*/}

        {/* Products title and Grid View Option start here */}

        <div className="flex justify-between items-center px-10 my-5">
          <div className="text-2xl font-semibold">Products</div>
          <div className="text-5xl flex gap-4">
            <Image
              src="Grid-2.svg"
              width={60}
              height={10}
              className="cursor-pointer"
            ></Image>
            <Image
              src="Grid-3.svg"
              width={60}
              height={10}
              className="cursor-pointer"
            ></Image>
            <Image
              src="Grid-4.svg"
              width={60}
              height={10}
              className="cursor-pointer"
            ></Image>
          </div>
        </div>
        {/* Products title and Grid View Option End here */}
      </section>
    </>
  );
}
