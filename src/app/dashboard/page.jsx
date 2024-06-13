"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/products";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig"; // Import your firebase config

async function fetchDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "products"));
  const data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

function dashboard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image: "",
    description: "",
    sizes: [],
    price: "",
    oldPrice: "",
  });
  const [size, setSize] = useState("");
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const addSize = () => {
    if (size && !newProduct.sizes.includes(size)) {
      setNewProduct((prev) => ({
        ...prev,
        sizes: [...prev.sizes, size],
      }));
    }
    setSize("");
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (imageFile) {
      const imageRef = ref(storage, `products/${imageFile.name}`);
      try {
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      } catch (error) {
        setErrorMessage("Error uploading image: " + error.message);
        return;
      }
    }

    try {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        image: imageUrl,
      });
      const data = await fetchDataFromFirestore();
      setUserData(data);
      setNewProduct({
        name: "",
        image: "",
        description: "",
        sizes: [],
        price: "",
        oldPrice: "",
      });
      setImageFile(null); // Clear the file input
      setSuccessMessage("Product added successfully!");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      setErrorMessage("Error adding product: " + error.message);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 font-main">
      <h1 className="text-4xl text-center mb-16 border-b-4 w-[230px] px-2 font-bold pb-4 m-auto border-950">
        Most Rated
      </h1>
      {/* <div className="grid grid-cols-1 max-sm:px-14 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
      <div className="flex items-center justify-center mt-7">
        <Link
          href=""
          className="flex font-bold rounded items-center border-2 border-950 p-2"
        >
          Explore More <HiOutlineArrowRight className="ml-2" />
        </Link>
      </div>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Product Name
          </label>
          <input
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Sizes
          </label>
          <input
            value={size}
            onChange={handleSizeChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
          <button
            type="button"
            onClick={addSize}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Size
          </button>
          <div className="mt-2">
            {newProduct.sizes.map((size, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Price
          </label>
          <input
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Old Price
          </label>
          <input
            name="oldPrice"
            value={newProduct.oldPrice}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default dashboard;
