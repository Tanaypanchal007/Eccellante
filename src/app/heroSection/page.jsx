import React from "react";
import Image from "next/image";

export default function heroSection() {
  return (
    <>
      <Image
        src="/hero-banner.jpg"
        width={900}
        height={0}
        className="w-[100%]"
      ></Image>
    </>
  );
}
