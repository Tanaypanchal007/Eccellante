'use client';
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import Image from 'next/image';
import Link from 'next/link';
import {
  NavbarName1,
  NavbarName2,
  NavbarName3,
  NavbarName4,
  NavbarName5,
} from "./string";
import { IoSearchOutline, IoBagHandleOutline } from 'react-icons/io5';
import { FiShoppingCart } from 'react-icons/fi';
import { MdHomeFilled } from 'react-icons/md';
import { CiUser } from 'react-icons/ci';
import { FaRegHeart } from 'react-icons/fa';
import { PiShoppingCartSimpleThin } from 'react-icons/pi';
import { CgMoreVertical } from 'react-icons/cg';
import Swal from 'sweetalert2';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Swal.fire({
        icon: 'success',
        title: 'Logged Out Successfully',
        text: 'You have been logged out.',
      });
    } catch (error) {
      console.error('Logout error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Logout Failed',
        text: 'Failed to log out. Please try again.',
      });
    }
  };
  useEffect(() => {
    // Optional: You can redirect or show a message if the user is not logged in
    if (!loading && !user) {
      // Example: Redirect to login page if not logged in
      router.push('/sign-in');
    }
  }, [user, loading]);
  return (
    <>
      <nav className="">
        <div className="flex justify-between items-center font-main fixed w-full px-10 py-4 bg-50 max-lg:px-3 z-50">
          <div>
            <Link href="/">
              <Image
                src="/icon-logo1.png"
                width={50}
                height={50}
                className="cursor-pointer max-xl:hidden "
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
            <ul className="text-950 flex gap-5 text-2xl font-medium max-xl:hidden">
              <li>
                <Link href="/" className="">
                  {NavbarName1}
                </Link>
              </li>
              <li>
                <Link href="/about">{NavbarName2}</Link>
              </li>
              <li>
                <Link href="/contact">{NavbarName3}</Link>
              </li>
              <li>
                <Link href="/products">{NavbarName4}</Link>
              </li>
              {/* <li>
                <Link href="/wishlist">{NavbarName5}</Link>
              </li> */}
            </ul>
          </div>
          <div className="flex gap-5 items-center text-3xl">
            {user ? (
              <>
                <Link href="/wishlist">
                  <FaRegHeart
                    className="cursor-pointer relative "
                    aria-label="Wishlist"
                  />
                  <span className="absolute text-sm text-white top-[20px] pt-[1px] right-[195px] bg-950 w-[20px] h-[20px] rounded-full max-md:right-[4px] max-md: text-center">
                    6
                  </span>
                </Link>
                <FiShoppingCart
                  className="cursor-pointer max-xl:hidden"
                  aria-label="Cart"
                />
                <button
                  onClick={handleLogout}
                  className="bg-950 text-100 px-3 py-2 rounded-md text-xl max-xl:hidden"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/sign-in"
                className="bg-950 text-100 px-3 py-2 rounded-md text-xl max-xl:hidden"
              >
                Login
              </Link>
            )}
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
            <Link href="/products" className="flex flex-col items-center">
              <IoBagHandleOutline className="cursor-pointer xl:hidden" />
              <p className="text-xs mt-1">Products</p>
            </Link>

            {user ? (
              <button
                onClick={handleLogout}
                className="flex flex-col items-center"
              >
                <CiUser />
                <p className="text-xs mt-1">Logout</p>
              </button>
            ) : (
              <Link href="/sign-in" className="flex flex-col items-center">
                <CiUser />
                <p className="text-xs mt-1">Login</p>
              </Link>
            )}

            <Link href="/about" className="flex flex-col items-center">
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
