"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { IoSearchOutline, IoBagHandleOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { MdHomeFilled } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { CgMoreVertical } from "react-icons/cg";

function Navbar() {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="">
        <div className="flex justify-between items-center font-main fixed w-full  px-10 py-4 bg-50 max-lg:px-3 z-50">
          <div>
            <Link href="/">
              <Image
                src="/icon-logo1.png"
                width={50}
                height={50}
                className="cursor-pointer max-lg:hidden "
                alt="Logo"
              />
            </Link>
            <Link href="/">
              <Image
                src="/main-logo.png"
                width={150}
                height={50}
                className="xl:hidden"
                alt="Main Logo"
              />
            </Link>
          </div>
          <div className="">
            <ul className="text-950 flex gap-5 text-2xl font-medium max-lg:hidden">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/wishlist">Wishlist</Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-5 items-center text-3xl">
            <IoSearchOutline className="cursor-pointer" aria-label="Search" />
            <FaRegHeart
              className="cursor-pointer xl:hidden"
              aria-label="Wishlist"
            />
            <FiShoppingCart
              className="cursor-pointer max-lg:hidden"
              aria-label="Cart"
            />
            <Link
              href="/"
              className="bg-950 text-100 px-3 py-2 rounded-md text-xl max-lg:hidden"
            >
              Sign in
            </Link>
          </div>

          {/* Mobile Screen Bottom Menu */}
          <div className="xl:hidden fixed bottom-0 w-full bg-white shadow-lg flex justify-around py-3 left-0 text-3xl items-center">
            <Link href="/" className="flex flex-col items-center">
              <MdHomeFilled />
              <p className="text-xs mt-1">Home</p>
            </Link>
            <Link href="/cart" className="flex flex-col items-center">
              <PiShoppingCartSimpleThin />
              <p className="text-xs mt-1">Cart</p>
            </Link>
            <Link href="" class="flex flex-col items-center">
              <IoBagHandleOutline className="cursor-pointer xl:hidden" />
              <p className="text-xs mt-1">Products</p>
            </Link>

            <Link href="/login" className="flex flex-col items-center">
              <CiUser />
              <p className="text-xs mt-1">Login</p>
            </Link>
            <Link href="/more" className="flex flex-col items-center">
              <CgMoreVertical />
              <p className="text-xs mt-1">More</p>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
