"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "../uiComponentes/Button";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/features/cartSlice";
import AddToWishlistButton from "../cart/addToWishlist";
import { Product } from "@/app/types";

interface ProductProps {
  product: Product
}


const ProductInfo = ({ product }: ProductProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const dispatch = useDispatch();

  const firstImage = product.imageUrl?.[selectedImageIndex] || "";
  const isAbsolute = firstImage.startsWith("http");
  const imageUrl = isAbsolute
    ? firstImage
    : `${process.env.NEXT_PUBLIC_HOST}${firstImage.startsWith("/") ? "" : "/"}${firstImage}`;

   const handleAddToCart = () => {
  dispatch(
    addToCart({
      id: product.id,
      title: product.title,
      image: product.imageUrl[0],
      price: product.price,
      quantity: 1,
    })
  );
};




  return (
    <div className="bg-gray-50 padding-x py-10 w-full">
      <div className="main-max-width mx-auto flex flex-col lg:flex-row gap-12 justify-center items-center lg:items-start">
        {/* Product Image + Thumbnails */}
        <div className="flex flex-col items-center gap-4 max-w-sm w-full">
          <div className="w-full aspect-[3/4] relative overflow-hidden rounded-lg shadow-sm border border-gray-200">
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 flex-wrap justify-center">
            {product.imageUrl.map((img, idx) => {
              const thumbUrl = img.startsWith("http")
                ? img
                : `${process.env.NEXT_PUBLIC_HOST}${img.startsWith("/") ? "" : "/"}${img}`;

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={clsx(
                    "w-16 h-16 rounded border cursor-pointer overflow-hidden",
                    selectedImageIndex === idx ? "border-gray-800" : "border-gray-300"
                  )}
                >
                  <Image
                    src={thumbUrl}
                    alt={`Thumb ${idx + 1}`}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-6 w-full max-w-xl">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold">
                  {product.title}
                </h1>
            <h3 className="text-2xl font-semibold text-green-800">${product.price}</h3>
            <div className="text-sm text-gray-600">
              <p><strong>Type:</strong> {product.clothesType}</p>
              <p><strong>Rating:</strong> {product.ratings} ★</p>
            </div>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Select Color:</label>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(color)}
                  className={clsx(
                    "px-4 py-2 border rounded-full text-sm capitalize",
                    selectedColor === color
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-white text-gray-800 border-gray-300"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-2">
            <label className="font-medium">Select Size:</label>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSize(size)}
                  className={clsx(
                    "px-4 py-2 border rounded text-sm",
                    selectedSize === size
                      ? "bg-green-800 text-white border-green-800"
                      : "bg-white text-gray-800 border-gray-300"
                  )}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Product Description */}
          <div>
            <h3 className="font-medium text-lg mb-3">Details</h3>
            <p className="text-gray-600 text-justify leading-6 text-[14px] md:text-base">
              {product.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex py-3 items-center gap-4 flex-wrap border-t pt-4">
            <Button onClick={handleAddToCart} className="default-btn">Add to Cart</Button>
               <AddToWishlistButton
                product={{
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  image: product.imageUrl[0] || "", 
                }}
              />

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
