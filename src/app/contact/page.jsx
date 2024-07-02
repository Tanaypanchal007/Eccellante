"use client";
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { IoMdSend } from "react-icons/io";

export default function Contact() {
  const [message, setMessage] = useState({ type: "", content: "" });
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const form = useRef();

  const checkUserInput = () => {
    const numberPattern = /^[0-9]+$/;
    if (!numberPattern.test(number)) {
      alert("Invalid Number. Only digits are allowed.");
      return false;
    }
    if (number.length === 10) {
      return true;
    } else {
      setError("Enter Valid Contact Number");
      setTimeout(() => {
        setError("");
      }, 2000);
      return false;
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!checkUserInput()) return;

    emailjs
      .sendForm(
        "service_9jw5d94",
        "template_7riuhpp",
        form.current,
        "8-SfirLlCXbY5NY4q"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          form.current.reset();
          setNumber(""); // Reset the number field here
          setMessage({
            type: "success",
            content: "Message sent successfully!",
          });
          setTimeout(() => {
            setMessage("");
          }, 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
          setMessage({
            type: "error",
            content: "Failed to send the message. Please try again later.",
          });
        }
      );
  };

  return (
    <section className="pt-28 font-main">
      <div className="text-center pb-10 text-lg font-medium">
        <p>Contact with us to share your feedback</p>
        <p>about our clothings</p>
      </div>
      <div className="flex justify-center items-center h-[500px]">
        <div className="shadow-3xl rounded w-full max-w-[600px]">
          <form ref={form} onSubmit={sendEmail} className="px-5 py-5">
            <div className="flex flex-col mb-5">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="user_name"
                id="name"
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                aria-label="Name"
              />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="user_email"
                id="email"
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                aria-label="E-mail"
              />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="number">Number</label>
              <input
                type="text"
                name="user_number"
                id="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                pattern="[0-9]*"
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                autoComplete="off"
                aria-label="Number"
              />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="message"
                rows={4}
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                autoComplete="off"
                aria-label="Description"
              ></textarea>
            </div>
            <p className="mb-1">{error}</p>
            {message.content && (
              <div
                className={`text-center mb-5 text-${
                  message.type === "success" ? "green" : "red"
                }-600`}
              >
                {message.content}
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                id="contact-btn"
                className="flex gap-2 justify-center items-center py-2 bg-gray-950 w-full text-white rounded cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-800"
              >
                <IoMdSend />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
