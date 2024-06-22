"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { db } from "../../firebaseConfig";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [count, setCount] = useState(0);
  const [countError, setCountError] = useState("");
  const [imageChoose, setImageChoose] = useState(false);

  const handelToggle = () => {
    setImageChoose(!imageChoose);
  };

  const countHandleIncrement = () => {
    setCount(count + 1);
    setCountError(" ");
  };

  const countHandleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
      setCountError("The Product Quantity cannot be less than 0");
      setTimeout(() => {
        setCountError(" ");
      }, 3000);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const docRef = doc(db, "products", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const productData = docSnap.data();
            setProduct(productData);
            if (productData.images && productData.images.length > 0) {
              setSelectedImage(productData.images[0]);
            }
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <section className="pt-28 px-10 max-md:px-5 font-main">
      <div className="flex max-md:flex-col gap-10 justify-center ">
        <div className="flex max-md:flex-col-reverse items-center md:items-start">
          <div className="flex flex-col max-md:flex-row max-md:gap-6 gap-4 max-md:mt-5 items-center md:items-start">
            {product.images &&
              product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  width={500}
                  height={500}
                  alt={`Thumbnail ${index + 1}`}
                  className={`cursor-pointer w-[130px] h-[158px] max-md:w-[70px] max-md:h-[73px] ${
                    selectedImage === image
                      ? "border-2 border-gray-500"
                      : "opacity-50 border-2 border-gray-200"
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
          </div>
          <div className="ml-10 max-md:ml-0 relative h-[680px] w-[500px] overflow-hidden max-md:h-[400px] max-md:w-[350px] mt-10 md:mt-0">
            <Image
              src={selectedImage}
              alt="Selected"
              layout="fill"
              className="object-cover border-2 border-gray-200" // Ensuring image scales and covers the area
            />
          </div>
        </div>
        <div className="w-full md:w-[60%] lg:w-[30%] max-md:w-[90%] mt-10 md:mt-0">
          <p className="text-4xl font-bold max-md:text-2xl">{product.name}</p>
          <p className="text-xl font-medium text-gray-400 mt-1">
            Overside T-shirt
          </p>
          <hr className="mt-2" />
          <p className="mt-3 text-xl max-lg:text-lg max-md:text-sm">
            {product.description}
          </p>
          <p className="mt-4 text-2xl font-bold">₹{product.price}</p>
          <p className="text-xs text-gray-400">(MRP inclusive all taxes)</p>

          <p className="mt-6 text-xl font-bold">Select Size</p>
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-3 mt-5 flex-wrap">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  className="px-3 flex justify-center items-center py-1 border border-gray-500 rounded text-sm w-20 max-md:w-12 h-10 hover:bg-gray-200 focus:outline-none transition cursor-pointer"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          <p className="mt-6">Select Quantity</p>
          <div className="flex items-center mt-5">
            <button
              className="bg-gray-900 px-4 py-2 text-xl text-white rounded-l"
              onClick={countHandleIncrement}
            >
              +
            </button>
            <p className="px-10 border-[2px] py-2 border-gray-900">{count}</p>
            <button
              className="bg-gray-900 px-4 py-2 text-xl text-white rounded-r"
              onClick={countHandleDecrement}
            >
              -
            </button>
          </div>
          <p className="mt-1 font-bold text-red-600">{countError}</p>
          <button className="flex items-center justify-center gap-2 border border-gray-900 w-full py-[12px] mt-6 text-xl rounded font-semibold">
            <FaRegHeart />
            <p>Add to Wishlist</p>
          </button>
          <button className="flex gap-2 items-center justify-center w-full border border-gray-900 mt-5 py-[12px] text-xl bg-gray-900 rounded text-white font-semibold">
            <FiShoppingCart />
            <p>Add to Cart</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
