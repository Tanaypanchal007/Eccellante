"use client"
import React, { useEffect, useState } from "react";
import { getDocs, collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";
import ProductCard from "../products/products";
import { fetchDataFromFirestore } from "../Utils/firebaseutil";

function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    sizes: [],
    price: "",
    oldPrice: "",
    label: "",
  });
  const [imageFile, setImageFile] = useState(null); // Main image file object
  const [additionalImageFiles, setAdditionalImageFiles] = useState([]); // Array of additional image file objects
  const [image, setImageUrl] = useState(""); // Main image URL for preview and storage
  const [multipleImages, setMultipleImages] = useState([]); // Array of additional image URLs for preview and storage
  const [successMessage, setSuccessMessage] = useState(""); // Define success message state
  const [errorMessage, setErrorMessage] = useState(""); // Define error message state
  const [isEditing, setIsEditing] = useState(false); // Flag for editing mode
  const [editProductId, setEditProductId] = useState(""); // Id of product being edited

  const sizesOptions = ["XS", "S", "M", "L", "XL"];

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
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Check if main image or additional images
    if (e.target.name === "image") {
      setImageFile(files[0]);
    } else if (e.target.name === "additionalImages") {
      setAdditionalImageFiles((prevFiles) => [...prevFiles, ...files]);
    }

    // Generate URLs for preview
    const fileUrls = files.map((file) => URL.createObjectURL(file));
    if (e.target.name === "image") {
      setImageUrl(fileUrls[0]);
    } else if (e.target.name === "additionalImages") {
      setMultipleImages((prevUrls) => [...prevUrls, ...fileUrls]);
    }
  };

  const uploadFile = async (file) => {
    const imageRef = ref(storage, `products/${file.name}`);
    await uploadBytes(imageRef, file);
    return getDownloadURL(imageRef);
  };

  const uploadFiles = async (files) => {
    const uploadPromises = files.map((file) => uploadFile(file));
    return Promise.all(uploadPromises);
  };

  const handleUpdate = async (id, newData) => {
    const docRef = doc(db, "products", id);

    try {
      await updateDoc(docRef, newData);
      const data = await fetchDataFromFirestore("products");
      setUserData(data);
    } catch (error) {
      console.error("Error updating product: ", error);
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

    let mainImageUrl = "";
    let multipleImages = [];

    // Upload main image
    if (imageFile) {
      try {
        mainImageUrl = await uploadFile(imageFile);
      } catch (error) {
        console.error("Error uploading main image: ", error);
        setErrorMessage("Error uploading main image: " + error.message);
        return;
      }
    }

    // Upload additional images
    if (additionalImageFiles.length > 0) {
      try {
        multipleImages = await uploadFiles(additionalImageFiles);
      } catch (error) {
        console.error("Error uploading additional images: ", error);
        setErrorMessage("Error uploading additional images: " + error.message);
        return;
      }
    }

    const productData = {
      ...newProduct,
      image: mainImageUrl,
      multipleImages: multipleImages,
    };

    try {
      // Add or update product based on isEditing state
      if (isEditing) {
        await handleUpdate(editProductId, productData);
        setSuccessMessage("Product updated successfully!");
      } else {
        await addDoc(collection(db, "products"), productData);
        setSuccessMessage("Product added successfully!");
      }

      // Reset form fields and state
      const data = await fetchDataFromFirestore("products");
      setUserData(data);
      setNewProduct({
        name: "",
        description: "",
        sizes: [],
        price: "",
        oldPrice: "",
        label: "",
      });
      setImageFile(null);
      setAdditionalImageFiles([]);
      setImageUrl("");
      setMultipleImages([]);
      setIsEditing(false);
      setEditProductId("");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      console.error("Error adding/updating product: ", error);
      setErrorMessage("Error adding/updating product: " + error.message);
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  const handleEditClick = (product) => {
    setNewProduct(product);
    setIsEditing(true);
    setEditProductId(product.id);
    setImageUrl(product.image); // Set main image URL for editing
    setMultipleImages(product.multipleImages || []); // Set additional images URLs for editing
  };

  const handleRemoveAdditionalImage = (index) => {
    setAdditionalImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setMultipleImages((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-10 font-main pt-20">
      {/* Success and error messages */}
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

      {/* Product form */}
      <form onSubmit={handleSubmit} className="mt-10">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
          <input
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Main Image</label>
          <input
            name="image"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
          />
          {/* Display selected main image for preview */}
          {image && (
            <img src={image} alt="Main product" className="mt-2 h-40 w-auto object-contain" />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Additional Images</label>
          <input
            name="additionalImages"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            multiple // Allow multiple file selection
          />
          {/* Display selected additional images for preview */}
          <div className="flex flex-wrap mt-2">
            {multipleImages.map((url, index) => (
              <div key={index} className="relative mr-2 mb-2">
                <img src={url} alt={`Additional product image ${index + 1}`} className="h-20 w-20 object-cover mr-2 mb-2" />
                <button
                  type="button"
                  onClick={() => handleRemoveAdditionalImage(index)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 transform translate-x-1/2 -translate-y-1/2"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <input
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Sizes</label>
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
          <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
          <input
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Old Price</label>
          <input
            name="oldPrice"
            value={newProduct.oldPrice}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Label</label>
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
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product list */}
      <h1 className="text-4xl text-center mb-16 px-2 font-bold pb-4 relative">Your Products</h1>
      <div className="overflow-y-auto max-h-96" style={{ scrollbarWidth: "thin", scrollbarColor: "#121212 #D1D5DB" }}>
        <div className="grid grid-cols-1 max-sm:px-14 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userData.map((product) => (
            <div key={product.id} className="min-h-[300px]">
              <ProductCard product={product} />
              <button onClick={() => handleEditClick(product)}>Edit</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;