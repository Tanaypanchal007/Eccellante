"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import {
  IoSearchOutline,
  IoBagHandleOutline,
  IoHeart,
  IoHeartOutline,
} from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { MdHomeFilled } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { CgMoreVertical } from "react-icons/cg";
import Swal from "sweetalert2";

function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlistCount(wishlist.length);
    };

    // Initial count
    updateWishlistCount();

    // Listen for changes in localStorage and wishlistUpdated event
    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully",
        text: "You have been logged out.",
      });
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Failed to log out. Please try again.",
      });
    }
  };

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
                className="cursor-pointer max-xl:hidden"
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
                  Home
                </Link>
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
            </ul>
          </div>
          <div className="flex gap-5 items-center text-3xl">
            {user ? (
              <>
                <Link href="/wishlist" className="relative">
                  {wishlistCount > 0 ? (
                    <>
                      <IoHeart className="cursor-pointer" />
                      <span className="absolute top-[-5px] right-[-5px] text-sm text-white bg-red-600 rounded-full w-[20px] h-[20px] flex justify-center items-center">
                        {wishlistCount}
                      </span>
                    </>
                  ) : (
                    <FaRegHeart className="cursor-pointer" />
                  )}
                </Link>
                <Link href="/cart">
                  <FiShoppingCart
                    className="cursor-pointer max-xl:hidden"
                    aria-label="Cart"
                  />
                </Link>
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
              <IoBagHandleOutline />
              <p className="text-xs mt-1">Cart</p>
            </Link>
            <Link href="/products" className="flex flex-col items-center">
              <IoSearchOutline />
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
