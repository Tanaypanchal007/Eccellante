import React from "react";
import { IoMdSend } from "react-icons/io";

export default function Contact() {
  return (
    <section className="pt-28 font-main">
      <div className="text-center pb-10 text-lg font-medium">
        <p>Contact with us to share your feedback</p>
        <p>about our clothings</p>
      </div>
      <div className="flex justify-center items-center">
        <div className="shadow-3xl rounded w-full max-w-[600px]">
          <form action="" className="px-5 py-5">
            <div className="flex flex-col mb-5">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows={4}
                className="border border-gray-800 outline-none w-full px-3 py-1 rounded mt-1"
                required
                autoComplete="off"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <input
                type="submit"
                id="contact-btn"
                value={`Send Message`}
                className="flex gap-2 justify-center items-center py-2 bg-gray-950 w-full text-white rounded cursor-pointer"
              />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
