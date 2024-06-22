import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

function shippingAndReturnPolicy() {
  return (
    <section>
      <div className="pt-28 flex px-4 items-center justify-center font-main bg-100 py-7 text-950 font-semibold text-xl">
        <Link href="/">Home</Link>
        <MdKeyboardArrowRight />
        <p>Shipping and Return Policy</p>
      </div>
      <div className="px-[250px] py-10 max-lg:px-[100px] max-md:px-[50px]">
        <h1 className="text-2xl  max-md:text-lg font-semibold mt-5">
          STANDARD DELIVERY
        </h1>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          Orders ship within 24 hours.
        </p>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          Orders will be delivered within 4-6 Business days, not inclusive of
          public holidays.
        </p>
        <h1 className="text-2xl  max-md:text-lg font-semibold mt-5">RETURNS</h1>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          7 Day Exchange Policy.
        </p>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          Enjoy peace of mind with our 7-Day Exchange Policy!
        </p>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          If your purchase doesn't meet expectations, we've got you covered.
        </p>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          Reach out within 7 days for a hassle-free Exchange/Credit Note.
        </p>
      </div>
    </section>
  );
}

export default shippingAndReturnPolicy;
