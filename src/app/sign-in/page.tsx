"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import React from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignIn = async () => {
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill in both email and password.",
      });
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res?.user) {
        Swal.fire({
          icon: "success",
          title: "Successfully Logged In",
          text: "You have successfully logged in.",
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
      console.error("Sign-in error:", e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-10 rounded-lg shadow-xl w-96">
        <h1 className="text-white text-2xl mb-5">Sign In</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded outline-none text-white placeholder-gray-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full p-3 bg-indigo-600 rounded text-white hover:bg-indigo-500"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        {error && <p className="text-red-500">{error.message}</p>}
      </div>
    </div>
  );
};

export default SignIn;
