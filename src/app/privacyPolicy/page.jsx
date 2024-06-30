import Link from "next/link";
import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";

function privacyPolicy() {
  return (
    <>
      <section>
        <div className="pt-28 flex items-center justify-center font-main bg-100 py-7 text-950 font-semibold text-xl">
          <Link href="/">Home</Link>
          <MdKeyboardArrowRight />
          <p> Privacy Policy</p>
        </div>
        <div className="px-[250px] py-10 max-lg:px-[100px] max-md:px-[50px]">
          <h1 className="text-2xl  max-md:text-lg font-semibold">SECURITY</h1>
          <p className="mt-2 text-[17px] max-md:text-[13px]">
            For the security and safety of your personal information, we use the
            most reliable payment gateway and SSL certification to encrypt
            information passed to and from the website during registration and
            checkout.
          </p>
          <h1 className="text-2xl  max-md:text-lg font-semibold mt-5">
            PRICE CHANGES
          </h1>
          <p className="mt-2 text-[17px] max-md:text-[13px]">
            Eccellante reserves the right to change the prices of the products
            we are selling. The prices of the products will, during the time of
            placing an order, be valid throughout that specific process.
          </p>
          <h1 className="text-2xl  max-md:text-lg font-semibold mt-5">
            PAYMENT
          </h1>
          <p className="mt-2 text-[17px] max-md:text-[13px]">
            When it comes to payment, rest assured that all transactions are
            encrypted and completely secure. We accept various payment methods
            including VISA, MASTERCARD, PAYTM, COD, PHONEPE, and Gpay.
          </p>
          <h1 className="text-2xl  max-md:text-lg font-semibold mt-5">
            SHIPPING CHARGES
          </h1>
          <p className="mt-2 text-[17px] max-md:text-[13px]">
            Free Shipping on all orders over 500 INR.
          </p>
          <h1 className="text-2xl max-md:text-lg font-semibold mt-5">
            FEEDBACK AND COMPLAINTS
          </h1>
          <p className="mt-2 text-[17px] max-md:text-[13px]">
            We value your feedback and are always looking for ways to improve.
            If you have any comments or complaints, please don’t hesitate to
            reach out to our Customer Services Team via email. We’re here to
            address any issues promptly and fairly.
          </p>
        </div>
      </section>
    </>
  );
}

export default privacyPolicy;
