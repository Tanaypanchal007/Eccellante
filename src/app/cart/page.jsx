import React from "react";
import Image from "next/image";
const Sizes = ["S", "M", "L", "XL", "XXl"];
function page() {
  return (
    <section className="pt-28 font-main">
      <div className="flex justify-evenly">
        <div className="">
          <div className="flex items-center justify-center ">
            <div className="">
              <Image
                src="/image-2.png"
                height={100}
                width={700}
                className=" h-[200px] w-[200px] bg-100 rounded-s-md cursor-pointer"
              />
            </div>
            <div className="space-y-3 px-7 py-[12px] border-2 rounded-e-md">
              <p className="text-2xl font-bold">The Healing Heart T-shirt</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                harum.
              </p>
              <p className="flex gap-2">
                {Sizes.map((size, index) => (
                  <p
                    key={index}
                    className="h-9 w-20 border-2 flex items-center justify-center rounded cursor-pointer hover:bg-50"
                  >
                    {size}
                  </p>
                ))}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <p className="text-xl font-semibold">₹1,199.00</p>
                  <del className="text-xl font-semibold text-400">
                    ₹1,500.00
                  </del>
                </div>
                <div className="flex items-center">
                  <button className="bg-950 px-4 py-2 text-white text-xl rounded-s-md">
                    +
                  </button>
                  <span className="px-9 border-[2px] py-2 border-900">0</span>
                  <button className="bg-950 px-4 py-2 text-white text-xl rounded-e-md">
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-5 ">
            <div className="">
              <Image
                src="/image-2.png"
                height={100}
                width={700}
                className=" h-[200px] w-[200px] bg-100 rounded-s-md cursor-pointer"
              />
            </div>
            <div className="space-y-3 px-7 py-[12px] border-2 rounded-e-md">
              <p className="text-2xl font-bold">The Healing Heart T-shirt</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
                harum.
              </p>
              <p className="flex gap-2">
                {Sizes.map((size, index) => (
                  <p
                    key={index}
                    className="h-9 w-20 border-2 flex items-center justify-center rounded cursor-pointer hover:bg-50"
                  >
                    {size}
                  </p>
                ))}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <p className="text-xl font-semibold">₹1,199.00</p>
                  <del className="text-xl font-semibold text-400">
                    ₹1,500.00
                  </del>
                </div>
                <div className="flex items-center">
                  <button className="bg-950 px-4 py-2 text-white text-xl rounded-s-md">
                    +
                  </button>
                  <span className="px-9 border-[2px] py-2 border-900">0</span>
                  <button className="bg-950 px-4 py-2 text-white text-xl rounded-e-md">
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="border-2">
          <p>Total </p>
          <div>
            <p></p>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default page;
