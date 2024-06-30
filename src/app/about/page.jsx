"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import CustomerReviews from "../customerReviews/page";
import FreeServices from "../freeServices/page";
import Aos from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    Aos.init({
      offset: 200,
    });
  }, []);
  return (
    <>
      <section className="pt-28 font-main">
        <h1 className="text-4xl mb-16 border-b-[4px] w-[190px] px-2 text-center font-bold pb-2 m-auto border-950">
          About Us
        </h1>
        <div className="flex px-10 justify-around pt-10 gap-10 flex-wrap max-lg:pt-0 max-sm:px-0">
          <div className="space-y-6 max-lg:w-full xl:w-[50%] max-xl:text-center max-sm:px-6 max-lg:px-14">
            <h1
              className="text-4xl font-bold max-sm:text-xl"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              Quality, Consciousness and <br /> Versatile Design.
            </h1>
            <p
              className="text-2xl max-sm:text-sm"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              Embracing the boundless power of self-expression through fashion,
              we, a gender-neutral clothing brand, are committed to offering
              comfy and adaptable apparel for every individual with unmatchable
              quality. We celebrate authenticity in all its forms and champion
              the belief that style knows no boundaries. EXCEL YOUR STYLE
              Proudly crafted in India.
            </p>
          </div>
          <div className="h-[400px] flex max-sm:ml-10 max-lg:m-auto max-xl:mt-14 max-lg:mt-10 max-lg:ml-24 ">
            <div
              className=" relative z-30 bottom-[50px]"
              data-aos="fade-down"
              data-aos-duration="1000"
            >
              <Image
                src="/image-1.png"
                height={400}
                width={300}
                className="bg-100  max-sm:h-[200px] max-sm:w-[400px] rounded"
              />
            </div>
            <div
              className="relative top-[100px] right-[50px]"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <Image
                src="/image-2.png"
                height={400}
                width={300}
                className="bg-50  max-sm:h-[200px] max-sm:w-[400px] rounded"
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <CustomerReviews />
        <FreeServices />
      </section>
    </>
  );
}
