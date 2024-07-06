"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import Swal from "sweetalert2";
import React from "react";
import { useRouter } from "next/navigation";

import { Oval } from "react-loader-spinner";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in both email and password.",
      });
      return;
    }
    setIsSubmitting(true);

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
          setName("");
          setMobile("");
          setPassword("");
          setIsSubmitting(false);

          router.push("/");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid email or password. Please try again.",
        });
        setIsSubmitting(false);
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid email or password. Please try again.",
      });
      setIsSubmitting(false);
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
    {isSubmitting && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Oval
              height={50}
              width={50}
              color="#fff"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        )}
      <div className="shadow-3xl rounded w-full max-w-[400px]">
      <div className="p-5">
        {error && <p className="text-red-500">{error.message}</p>}


        <div className="mt-3 ">
        <label>Name</label>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
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
        <div className="mt-3 mb-4">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-2"
        />
        </div>
        <p className="mt-2 text-center text-gray-700 font-medium flex gap-1 justify-center">Already have an account ? <p onClick={()=>router.push("/sign-in")} className=" font-bold cursor-pointer">Sign In</p></p>
        <button
          onClick={handleSignUp}
          className="flex gap-2 justify-center items-center py-2 bg-gray-950 w-full text-white rounded mt-2"
        >
         {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </div>
      </div>
    </div>
    </section>
  );
};

export default SignUp;
