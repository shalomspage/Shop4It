"use client";

import Image from "next/image";
import React, { useState } from "react";

export interface ProductData {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

interface ProductFormProps {
  initialData?: ProductData;
  onSubmit: (data: ProductData) => Promise<void>;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState<ProductData>(
    initialData || {
      title: "",
      description: "",
      price: 0,
      images: [],
      category: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map((file) => URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
      }));
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">
        {initialData ? "Edit Product" : "Add New Product"}
      </h2>

      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Product Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      {/* Description */}
      <textarea
        name="description"
        placeholder="Product Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      {/* Price */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />

      {/* Category */}
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      {/* Images */}
      <div>
        <label className="block mb-2 font-semibold">Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageAdd}
          className="block w-full text-sm text-gray-500"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.images.map((img, index) => (
            <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
              <Image
                src={img}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleImageRemove(index)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded px-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
