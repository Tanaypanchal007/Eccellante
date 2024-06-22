import React from "react";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

function exchangeAndReturnPolicy() {
  return (
    <section>
      <div className="pt-28 flex px-4 items-center justify-center font-main bg-100 py-7 text-950 font-semibold text-xl">
        <Link href="/">Home</Link>
        <MdKeyboardArrowRight />
        <p>Exchange & Return Policy</p>
      </div>
      <div className="px-[250px] py-10 max-lg:px-[100px] max-md:px-[50px]">
        <p className="mt-5 text-[17px] max-md:text-[13px]">
          7-Day Exchange Policy.
        </p>
        <p className="mt-5 text-[17px] max-md:text-[13px]">
          Enjoy peace of mind with our 7-Day Exchange Policy!
        </p>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          If your purchase doesn't meet expectations, we've got you covered.
        </p>
        <p className="mt-2 text-[17px] max-md:text-[13px]">
          Reach out within 7 days for a hassle-free Exchange.
        </p>
        <p className="mt-5 text-[17px] max-md:text-[13px]">
          We have a No Refund Policy! We will give you a credit note if you do
          not wish to exchange!
        </p>
        <p className="mt-5 text-[17px] max-md:text-[13px]">
          If you have any queries, please e-mail us here{" "}
          <Link
            href="mailto:eccellante.support@gmail.com"
            className="font-bold"
          >
            eccellante.support@gmail.com
          </Link>
        </p>
      </div>
    </section>
  );
}

export default exchangeAndReturnPolicy;
