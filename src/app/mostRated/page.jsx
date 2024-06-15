// "use client";
// import React, { useEffect, useState } from "react";
// import ProductCard from "../components/products";
// import Link from "next/link";
// import { HiOutlineArrowRight } from "react-icons/hi";
// import { getDocs, collection } from "firebase/firestore";
// import { db } from "../firebaseConfig"; // Import your firebase config

// async function fetchDataFromFirestore() {
//   const querySnapshot = await getDocs(collection(db, "products"));
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

import React from "react";
import ProductCard from "../mostRated/mostRatedProducts";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";

function MostRated() {
  const products = [
    {
      id: 1,
      name: "The Healing Heart T-shirt",
      description: "Lorem ipsum dolor sit amet dolor sit amet consectetur.",
      image: "/image-p.jpg",
      discount: "25% off",
      price: "₹ 1,199.00",
      oldPrice: "₹ 1,599.00",
    },
    {
      id: 1,
      name: "The Healing Heart T-shirt",
      description: "Lorem ipsum dolor sit amet dolor sit amet consectetur.",
      image: "/image-p.jpg",
      discount: "25% off",
      price: "₹ 1,199.00",
      oldPrice: "₹ 1,599.00",
    },
    {
      id: 1,
      name: "The Healing Heart T-shirt",
      description: "Lorem ipsum dolor sit amet dolor sit amet consectetur.",
      image: "/image-p.jpg",
      discount: "25% off",
      price: "₹ 1,199.00",
      oldPrice: "₹ 1,599.00",
    },
    {
      id: 1,
      name: "The Healing Heart T-shirt",
      description: "Lorem ipsum dolor sit amet dolor sit amet consectetur.",
      image: "/image-p.jpg",
      discount: "25% off",
      price: "₹ 1,199.00",
      oldPrice: "₹ 1,599.00",
    },
    // Add more products as needed
  ];
  return (
    <div className="container mx-auto px-4 py-10 font-main">
      <h1 className="text-4xl text-center mb-16 border-b-4 w-[230px] px-2 font-bold pb-4 m-auto border-950">
        Most Rated
      </h1>
      <div className="grid grid-cols-1 max-sm:px-14 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-7">
        <Link
          href=""
          className="flex font-bold rounded items-center border-2 border-950 p-2"
        >
          Explore More <HiOutlineArrowRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default MostRated;
