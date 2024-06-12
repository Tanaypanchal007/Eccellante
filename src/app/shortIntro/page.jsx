import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineArrowRight } from "react-icons/hi";

const ShortIntro = (props) => {
  return (
    <section className="py-10 px-8 font-main">
      <div className="flex justify-center items-center gap-10 max-lg:flex-col">
        <div>
          <Image
            src="/main-logo.png"
            width={300}
            height={100}
            alt="Main-logo"
          />
          <p className="text-2xl max-w-2xl mt-2.5 mb-[30px]">
            Offers you a range of oversized T-shirts with fashionable and unique
            designs of the greatest quality.
          </p>
          <Link href="/" className="unique-btn">
            <p className=" text-xl flex items-center mt-7.5 border-2 border-950 bg-gray-900 text-white w-[210px]  px-3 py-3 rounded hover:bg-white hover:text-950 transition-all duration-300">
              Start Shopping
              <HiOutlineArrowRight className="animation-btn ml-1.5 mt-1 hover:bg-white hover:text-950 " />
            </p>
          </Link>
        </div>
        <div className="flex items-center gap-5 ">
          <div className="overflow-hidden">
            <Image
              src="/kunal-image.jpg"
              width={300}
              height={400}
              alt="Kunal"
              className="cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="flex flex-col gap-6 max-md:gap-3 overflow-hidden">
            <Image
              src="/kunal-second-image.jpg"
              width={350}
              height={200}
              alt="Kunal Second"
              className="cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden"
            />
            <Image
              src="/kunal-second-image.jpg"
              width={350}
              height={200}
              alt="Kunal Third"
              className="cursor-pointer hover:scale-105 transition-transform duration-200 overflow-hidden "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortIntro;
