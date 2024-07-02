"use client";
import React from "react";
import { PiHeadphones } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

export default function FreeServices() {
  // const Services = [
  //   {
  //     id: 1,
  //     icon: FiTruck,
  //     servicesName: "Free",
  //     servicesNikName: "Shipping",
  //   },
  //   {
  //     id: 2,
  //     icon: PiHeadphones,
  //     servicesName: "24X7",
  //     servicesNikName: "Support",
  //   },
  //   {
  //     id: 3,
  //     icon: FaRegStar,
  //     servicesName: "Premium",
  //     servicesNikName: "Quality",
  //   },
  // ];
  useEffect(() => {
    Aos.init({
      offset: 150,
    });
  });
  return (
    <>
      <section className="bg-50">
        <div className="flex justify-evenly text-center font-main py-10 max-xl:flex-col max-md:px-4 max-md:gap-5 max-xl:px-10 max-xl:gap-10 ">
          <div
            className="flex flex-col justify-center items-center shadow-md px-28 py-14 bg-white rounded-md cursor-pointer hover:scale-105 duration-200 max-lg:mx-28 max-sm:mx-5"
            // data-aos="fade-up"
            // data-aos-duration="400"
          >
            <FiTruck className="text-5xl mb-3 text-900" />
            <p className="text-2xl font-semibold">Free</p>
            <p className="text-2xl font-semibold">Shipping</p>
          </div>
          <div
            className="flex flex-col justify-center items-center shadow-md px-28 py-14 bg-white rounded-md cursor-pointer hover:scale-105 duration-200 max-lg:mx-28 max-sm:mx-5"
            // data-aos="fade-up"
            // data-aos-duration="800"
          >
            <PiHeadphones className="text-5xl mb-3 text-900" />
            <p className="text-2xl font-semibold">24X7</p>
            <p className="text-2xl font-semibold">Support</p>
          </div>
          <div
            className="flex flex-col justify-center items-center shadow-md px-28 py-14 bg-white rounded-md cursor-pointer hover:scale-105 duration-200 max-lg:mx-28 max-sm:mx-5"
            // data-aos="fade-up"
            // data-aos-duration="1200"
          >
            <FaRegStar className="text-5xl mb-3 text-900" />
            <p className="text-2xl font-semibold">Premium</p>
            <p className="text-2xl font-semibold">Quality</p>
          </div>
        </div>
      </section>
    </>
  );
}
