"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { IoSearchOutline, IoBagHandleOutline, IoHeart } from "react-icons/io5";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { VscInfo } from "react-icons/vsc";
import { IoShirtOutline, IoLogInOutline } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import Swal from "sweetalert2";

// Dynamically import the Navbar to ensure it is only rendered on the client side
const DynamicNavbar = dynamic(() => import("./Navbar"), { ssr: false });

function Navbar() {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
      setWishlistCount(wishlist.length);
    };

    updateWishlistCount();

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
    <nav className="">
      <div className="flex justify-between items-center font-main fixed w-full px-10 py-4 bg-50 max-lg:px-3 z-50">
        <div>
          <p onClick={() => router.push("/")}>
            <Image
              src="/icon-logo1.png"
              width={50}
              height={50}
              className="cursor-pointer max-xl:hidden"
              alt="Logo"
            />
          </p>
          <p onClick={() => router.push("/")}>
            <Image
              src="/main-logo.png"
              width={150}
              height={50}
              className="xl:hidden"
              alt="Main Logo"
            />
          </p>
        </div>
        <div className="">
          <ul className="text-950 flex gap-5 text-2xl font-medium max-xl:hidden">
            <li className="group">
              <p
                onClick={() => router.push("/")}
                className="cursor-pointer relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[3px] after:bg-gray-800 after:transition-all after:duration-300 group-hover:after:w-full"
              >
                Home
              </p>
            </li>
            <li className="group">
              <p
                onClick={() => router.push("/about")}
                className="cursor-pointer relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[3px] after:bg-gray-800 after:transition-all after:duration-300 group-hover:after:w-full"
              >
                About
              </p>
            </li>
            <li className="group">
              <p
                onClick={() => router.push("/contact")}
                className="cursor-pointer relative  after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[3px] after:bg-gray-800 after:transition-all after:duration-300 group-hover:after:w-full"
              >
                Contact
              </p>
            </li>
            <li className="group">
              <p
                onClick={() => router.push("/products")}
                className="cursor-pointer relative after:content-[''] after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-[3px] after:bg-gray-800 after:transition-all after:duration-300 group-hover:after:w-full"
              >
                Products
              </p>
            </li>
          </ul>
        </div>
        <div className="flex gap-5 items-center text-3xl">
          {user ? (
            <>
              <p onClick={() => router.push("/wishlist")} className="relative">
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
              </p>
              <p onClick={() => router.push("/cart")}>
                <FiShoppingCart
                  className="cursor-pointer max-xl:hidden"
                  aria-label="Cart"
                />
              </p>
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

        <div className="xl:hidden fixed bottom-0 w-full bg-white shadow-lg flex justify-around py-3 left-0 text-3xl items-center">
          <Link href="/" className="flex flex-col items-center">
            <GoHome />
            <p className="text-xs mt-1">Home</p>
          </Link>
          <Link href="/about" className="flex flex-col items-center">
            <VscInfo />
            <p className="text-xs mt-1">About</p>
          </Link>
          <Link href="/products" className="flex flex-col items-center">
            <IoShirtOutline />
            <p className="text-xs mt-1">Products</p>
          </Link>
          <Link href="/cart" className="flex flex-col items-center">
            <IoBagHandleOutline />
            <p className="text-xs mt-1">Cart</p>
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center"
            >
              <IoLogInOutline />
              <p className="text-xs mt-1">Logout</p>
            </button>
          ) : (
            <Link href="/sign-in" className="flex flex-col items-center">
              <IoLogInOutline />
              <p className="text-xs mt-1">Login</p>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

// Export the Navbar using dynamic import
export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
