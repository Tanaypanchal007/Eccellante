import React from "react";
import Image from "next/image";

export default function heroSection() {
  return (
    <>
      <Image
        src="/Home-Banner.jpg"
        width={900}
        height={900}
        className="w-[100%] max-lg:hidden"
      ></Image>
      <Image
        src="/mobile-banner-home-page.jpg"
        width={900}
        height={900}
        className="w-[100%] xl:hidden lg:hidden sm:block md:block"
      ></Image>
    </>
  );
}
