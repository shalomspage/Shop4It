"use client";

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
      [name]:
        name === "price"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      {/* TODO: Image upload field integration */}
      {/* You can add ImageUploadField here later */}

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
};

export default ProductForm;
