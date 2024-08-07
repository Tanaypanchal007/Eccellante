"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <footer className="bg-950 py-10 text-white font-main mt-[20px] max-lg:mb-10">
        <div className="flex justify-between items-center px-10 max-lg:flex-col max-lg:items-start">
          <div className="flex flex-col items-center max-lg:items-start gap-8 -mt-[30px]">
            <Image
              src="/icon-logo.png"
              width={200}
              height={100}
              className="max-md:w-[100px] max-lg:hidden"
              alt="logo-lg"
            ></Image>
            <Image
              src="/main-logo1.png"
              width={200}
              height={100}
              className="max-md:w-[200px] lg:hidden"
              alt="logo-sm"
            ></Image>
            <div className="text-4xl flex gap-3 max-md:text-2xl">
              <Link href="/" className="border-r-[3px] border-white pr-3">
                <FaThreads />
              </Link>
              <Link href="/">
                <FaInstagram />
              </Link>
            </div>
          </div>
          <div className="max-w-md space-y-7 -mt-[60px] max-lg:mt-7 max-lg:space-y-4">
            <h2 className="text-2xl max-xl:text-xl font-black tracking-widest">
              ABOUT US
            </h2>
            <p>
              Embracing the boundless power of self-expression through fashion,
              wem gender-neutral clothing brand committed to offering comfy and
              adaptable apparel for every individual with unmatched quality.
            </p>
            <p>
              We celebrate authenticity in all its forms. We champion the belief
              that style knows no boundaries.
            </p>
            <p>EXCEL YOUR STYLE</p>
          </div>
          <div className="flex flex-col space-y-7 -mt-[60px] max-lg:mt-7 max-lg:space-y-4">
            <h2 className="text-2xl font-black tracking-widest">
              FOR CUSTOMERS
            </h2>
            <ul className="flex flex-col space-y-7 max-lg:space-y-4">
              <p
                onClick={() => router.push("/footer")}
                className="cursor-pointer"
              >
                Gift Cards
              </p>
              <p
                onClick={() => router.push("/privacyPolicy")}
                className="cursor-pointer"
              >
                Privacy Policy
              </p>
              <p
                onClick={() => router.push("/privacyPolicy")}
                className="cursor-pointer"
              >
                Terms & Conditions
              </p>
              <p
                onClick={() => router.push("/shippingandReturnPolicy")}
                className="cursor-pointer"
              >
                Shipping & Return
              </p>
              <p
                onClick={() => router.push("/exchangeAndReturnPolicy")}
                className="cursor-pointer"
              >
                Exchange & Return
              </p>
            </ul>
          </div>
          {/* Contact Section */}
          <div className="space-y-7 max-lg:mt-7 max-lg:space-y-4">
            <h2 className="text-2xl font-black tracking-widest">CONTACT US</h2>
            <div className="space-y-5">
              <div className="flex gap-2 items-center ">
                <CiMail />
                <Link href="mailto:contact.eccelante@gmail.com">
                  contact.eccelante@gmail.com
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <IoCallOutline />
                <Link href="tel:+919638316376">+91 9638316376</Link>
              </div>
            </div>

            {/* Payment Section */}
            <h2 className="text-2xl font-black tracking-widest">PAYMENTS</h2>
            <div className="flex gap-10 mt-3">
              <Image src="/visa-logo.png" alt="Visa" width={80} height={50} />
              <Image
                src="/g-pay-logo.png"
                alt="Google Pay"
                width={90}
                height={50}
              />
            </div>
            <div className="flex gap-4 mt-3">
              <Image
                src="/phonepay-logo.png"
                alt="PhonePe"
                width={100}
                height={50}
              />
              <Image src="/paytm-logo.png" alt="Paytm" width={90} height={50} />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

Footer;
