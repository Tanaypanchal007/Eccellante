"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import Swal from "sweetalert2";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in both email and password.",
      });
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      if (res?.user) {
        Swal.fire({
          icon: "success",
          title: "Successfully Signed Up",
          text: "You have successfully created an account.",
        }).then(() => {
          sessionStorage.setItem("user", JSON.stringify(res.user));
          setEmail("");
          setPassword("");
          router.push("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid email or password. Please try again.",
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid email or password. Please try again.",
      });
      console.error("Sign-up error:", e);
    }
  };

  return (
    <section className="pt-24 font-main">
       <h1 className="text-4xl text-center mb-10 border-b-4 w-[160px] px-2 font-bold pb-3 m-auto border-950">
        Sign Up
      </h1>
      <div className="text-center pb-10 text-lg font-medium">
        <p>Contact with us to share your feedback</p>
        <p>about our clothings</p>
      </div>
    <div className="flex justify-center items-center pb-10">
      <div className="shadow-3xl rounded w-full max-w-[400px]">
      <div className="p-5">
        {error && <p className="text-red-500">{error.message}</p>}

       
        <div className="mt-3 ">
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-2"
        />
        </div>
        <div className="mt-3 ">
        <label>E-mail</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-2"
        />
        </div>
        <div className="mt-3 ">
        <label>Contect</label>
        <input
          type="number"
          placeholder="Contect Number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-2"
        />
        </div>
        <div className="mt-3">
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-2"
        />
        </div>
        <div className="mt-3 mb-8">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-2"
        />
        </div>
        <button
          onClick={handleSignUp}
          className="flex gap-2 justify-center items-center py-2 bg-gray-950 w-full text-white rounded"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="mt-2">Already have an account ! <Link href="/sign-in" className=" font-semibold">Sign In</Link></p>
      </div>
      </div>
    </div>
    </section>
  );
};

export default SignUp;
