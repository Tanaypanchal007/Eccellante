import React from "react";

export default function subscribe() {
  return (
    <>
      <section className="px-5 py-14 font-main">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="bg-950 text-white px-7 max-sm:px-16 py-11 text-5xl font-black rounded-t-md md:rounded-t-none md:rounded-s-md">
            SUB <br />
            SCRIBE!!!
          </div>
          <div className="space-y-5 px-14 max-sm:px-10 py-8 bg-50 rounded-b-md md:rounded-b-none md:rounded-e-md w-full md:w-auto">
            <div>
              <p className="text-2xl font-semibold text-center md:text-left">
                Subscribe & get 20% off on your next purchase
              </p>
            </div>
            <div>
              <form action="/">
                <div className="flex flex-col md:flex-row">
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    className="px-3 bg-100 py-4 w-full md:w-[70%] rounded-t-md md:rounded-t-none md:rounded-s-md outline-none text-md font-semibold max-sm:mb-2"
                    required
                  />
                  <button className="text-md px-7 py-4 bg-950 text-white rounded-b-md md:rounded-b-none md:rounded-e-md">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
