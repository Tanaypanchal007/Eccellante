import React from "react";
import Image from "next/image";

export default function heroSection() {
  return (
    <>
      <Image
        src="/Home-Banner.jpg"
        width={900}
        height={900}
        className="w-[100%]"
      ></Image>
    </>
  );
}
