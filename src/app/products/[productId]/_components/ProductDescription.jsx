// ✅ Client Component — handles interactivity
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { toast } from "react-toastify";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Spinner from "@/components/Spinner";

export default function ProductDescription({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast("Added to cart!",{
        autoClose:500,
    });
  };

  if (!product) return <div>Product not found</div>;

  const images = product.imageUrls || ["/placeholder.jpg"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-white-500 dark:text-white mb-6">
        <a href="/" className="hover:underline">Home</a> /{" "}
        <span className="text-gray-500 dark:text-white-900 dark:text-white">{product.category}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="md:w-1/2">
          <div className="relative aspect-square bg-white rounded-lg border border-gray-200 mb-4">
            <Image
              src={images[selectedImage] || "/placeholder.jpg"}
              alt={product.name}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`flex-shrink-0 w-16 h-16 rounded border-2 ${
                  idx === selectedImage ? "border-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  width={64}
                  height={64}
                  className="object-contain p-1"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-500 dark:text-white-900 dark:text-white mb-2">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-3">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-gray-300 dark:text-white"
                }`}
              />
            ))}
            <span className="text-gray-500 dark:text-white text-sm">({product.reviews || 0} reviews)</span>
          </div>

          <p className="text-2xl font-bold text-primary mb-3">
            Rs. {product.price.toLocaleString()}
          </p>

          <p className="text-gray-500 dark:text-white mb-4"><span className="font-medium">Brand:</span> {product.brand}</p>
          <p className="text-gray-500 dark:text-white mb-6"><span className="font-medium">Category:</span> {product.category}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-500 dark:text-white whitespace-pre-line">
              {product.description || "No description available."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-secondary hover:bg-secondary/45 text-white py-3 px-6 rounded-lg font-medium"
            >
              Add to Cart
            </button>
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-500 dark:text-white py-3 px-6 rounded-lg font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}