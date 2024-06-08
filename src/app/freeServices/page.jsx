import React from "react";
import { PiHeadphones } from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import { FiTruck } from "react-icons/fi";

export default function FreeServices() {
  const Services = [
    {
      id: 1,
      icon: FiTruck,
      servicesName: "Free",
      servicesNikName: "Shipping",
    },
    {
      id: 2,
      icon: PiHeadphones,
      servicesName: "24X7",
      servicesNikName: "Support",
    },
    {
      id: 3,
      icon: FaRegStar,
      servicesName: "Premium",
      servicesNikName: "Quality",
    },
  ];
  return (
    <>
      <section className="bg-50">
        <div className="flex justify-evenly text-center font-main py-10 max-xl:flex-col max-md:px-4 max-md:gap-5 max-xl:px-10 max-xl:gap-10">
          {Services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-center items-center shadow-md px-28 py-14 bg-white rounded-md cursor-pointer"
            >
              <service.icon className="text-5xl mb-3" />
              <p className="text-2xl font-black">{service.servicesName}</p>
              <p className="text-2xl font-black">{service.servicesNikName}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
