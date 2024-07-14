// "use client";
// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/products";
// import Link from "next/link";
// import { HiOutlineArrowRight } from "react-icons/hi";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../firebaseConfig"; // Import your firebase config

// async function fetchDataFromFirestore() {
//   const querySnapshot = await getDocs(collection(db, "eccellante"));
//   const data = [];
//   querySnapshot.forEach((doc) => {
//     data.push({ id: doc.id, ...doc.data() });
//   });
//   return data;
// }

// function MostRated() {
//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const data = await fetchDataFromFirestore();
//         setUserData(data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-10 font-main">
//       <h1 className="text-4xl text-center mb-16 border-b-4 w-[230px] px-2 font-bold pb-4 m-auto border-950">
//         Most Rated
//       </h1>
//       <div className="grid grid-cols-1 max-sm:px-14 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {userData.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//       <div className="flex items-center justify-center mt-7">
//         <Link
//           href=""
//           className="flex font-bold rounded items-center border-2 border-950 p-2"
//         >
//           Explore More <HiOutlineArrowRight className="ml-2" />
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default MostRated;
"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../mostRated/mostRatedProducts";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Import your firebase config

async function fetchDataFromFirestore() {
  const data = [];
  const querySnapshot = await getDocs(collection(db, "eccellante"));
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

function MostRated() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromFirestore();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 max-sm:px-0 mt-10 py-10 max-sm:py-5 max-sm:mt-4 font-main">
      <h1 className="text-4xl max-sm:text-2xl max-sm:w-[170px] text-center mb-10 border-b-4 w-[230px] font-bold pb-4 m-auto border-950">
        Best Seller
      </h1>
      <div className="grid grid-cols-2 max-sm:px-5 md:grid-cols-2 lg:grid-cols-4 gap-10 max-sm:gap-2 mx-18 max-sm:mx-0 max-lg:mx-5">
        {userData.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        <p
          onClick={() => router.push("/products")}
          className="cursor-pointer flex font-bold px-6 py-2 rounded items-center border-2 border-950 hover:bg-950 hover:text-white hover:font-medium transition-all duration-300"
        >
          Explore More <HiOutlineArrowRight className="ml-2" />
        </p>
      </div>
    </div>
  );
}

export default MostRated;
