"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CustomerReviews() {
  let sliderRef = useRef(null);
  const play = () => {
    sliderRef.slickPlay();
  };
  const pause = () => {
    sliderRef.slickPause();
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="font-main m-5 max-md:m-0 overflow-hidden px-1 py-10 max-lg:px-4 max-lg:py-4 relative">
      <h1 className="text-4xl max-sm:text-2xl max-sm:w-[230px] text-center mb-14 border-b-4 w-[350px] px-2 pb-4 m-auto border-950">
        Customer Review
      </h1>
      <Slider
        ref={(slider) => (sliderRef = slider)}
        {...settings}
        className="mb-10"
      >
        {data.map((d, index) => (
          <div
            key={index}
            className="p-4 text-black rounded-md flex flex-col items-center justify-center text-center cursor-pointer "
          >
            <div className="shadow-3xl rounded-xl ">
              <h1 className="text-lg font-semibold pt-3">{d.customerName}</h1>
              <div className="flex mt-2 text-2xl text-[#fdcc0d] justify-center mb-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
              <p className="mx-10 max-lg:mx-2 pb-3">{d.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const data = [
  {
    customerName: `Sakshi Tanvar`,
    description: `Absolutely thrilled with my oversized tee purchase! The quality is top-notch, exceeded my expectations. Even better, it arrived right on time, no hassle whatsoever. Plus, the easy return policy gives me peace of mind. Worth every penny.`,
  },
  {
    customerName: `Sakshi Tanvar`,
    description: `Absolutely thrilled with my oversized tee purchase! The quality is top-notch, exceeded my expectations. Even better, it arrived right on time, no hassle whatsoever. Plus, the easy return policy gives me peace of mind. Worth every penny.`,
  },
  {
    customerName: `Sakshi Tanvar`,
    description: `Absolutely thrilled with my oversized tee purchase! The quality is top-notch, exceeded my expectations. Even better, it arrived right on time, no hassle whatsoever. Plus, the easy return policy gives me peace of mind. Worth every penny.`,
  },
  {
    customerName: `Sakshi Tanvar`,
    description: `Absolutely thrilled with my oversized tee purchase! The quality is top-notch, exceeded my expectations. Even better, it arrived right on time, no hassle whatsoever. Plus, the easy return policy gives me peace of mind. Worth every penny.`,
  },
];

export default CustomerReviews;
