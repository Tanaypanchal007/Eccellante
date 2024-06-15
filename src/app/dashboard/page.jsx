"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig"; // Import your firebase config
import ProductCard from "../products/products";
import { fetchDataFromFirestore } from "../Utils/firebaseutil";



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
    label: "", // New label field
  });
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const sizesOptions = ["XS", "S", "M", "L", "XL"]; // Predefined sizes

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchDataFromFirestore("products");
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

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setNewProduct((prev) => {
      if (checked) {
        return { ...prev, sizes: [...prev.sizes, value] };
      } else {
        return { ...prev, sizes: prev.sizes.filter((size) => size !== value) };
      }
    });
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
      const data = await fetchDataFromFirestore("products");
      setUserData(data);
      setNewProduct({
        name: "",
        image: "",
        description: "",
        sizes: [],
        price: "",
        oldPrice: "",
        label: "",
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
    <div className="container mx-auto px-4 py-10 font-main pt-20">

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
          <div>
            {sizesOptions.map((size) => (
              <label key={size} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value={size}
                  checked={newProduct.sizes.includes(size)}
                  onChange={handleSizeChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{size}</span>
              </label>
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Label
          </label>
          <input
            name="label"
            value={newProduct.label}
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

      <h1 className="text-4xl text-center mb-16 px-2 font-bold pb-4 relative">
        Your Products
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-950"></span>
      </h1>

      {/* Add scrollable container for products */}
      <div className="overflow-y-auto max-h-96" style={{ scrollbarWidth: "thin", scrollbarColor: "#121212 #D1D5DB" }}>
        <div className="grid grid-cols-1 max-sm:px-14 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userData.map((product) => (
            <ProductCard key={product.id} product={product} className="min-h-[300px]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default dashboard;
