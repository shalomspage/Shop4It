"use client";
import React from "react";

interface Props {
  title: string;
  loading: boolean;
  onCancel?: () => void;
}

const ProductFormHeader: React.FC<Props> = ({ title, loading, onCancel }) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-4 py-2 cursor-pointer rounded border">
            Cancel
          </button>
        )}
        <button type="submit" disabled={loading} className="update-item-btn">
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default ProductFormHeader;