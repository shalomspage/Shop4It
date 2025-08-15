"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageUploadFieldProps {
  value: string[];
  onChange: (urls: string[]) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ value, onChange }) => {
  const [cloudinaryLoaded, setCloudinaryLoaded] = useState(false);

  // Load Cloudinary script
  useEffect(() => {
    if (window.cloudinary) {
      setCloudinaryLoaded(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://upload-widget.cloudinary.com/global/all.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => setCloudinaryLoaded(true);
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", () => setCloudinaryLoaded(true));
    }
  }, []);

  const handleUpload = () => {
    if (!window.cloudinary) {
      alert("Cloudinary not loaded yet");
      return;
    }

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
        multiple: true,
        resourceType: "image",
        folder: "products",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          onChange([...value, result.info.secure_url]);
        }
      }
    );

    myWidget.open();
  };

  const removeImage = (url: string) => {
    onChange(value.filter((img) => img !== url));
  };

  return (
    <div>
      {/* Upload Button */}
      <button
        type="button"
        onClick={handleUpload}
        disabled={!cloudinaryLoaded}
        className={`default-btn ${
          cloudinaryLoaded ? "": "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {cloudinaryLoaded ? "Upload Images" : "Loading..."}
      </button>

      {/* Images Grid */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {value.map((url) => (
          <div key={url} className="relative group">
            <Image
              src={url}
              alt="Uploaded"
              className="w-full h-32 object-cover rounded"
              width={200}
              height={128}
            />
           
            <div
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <button
                type="button"
                onClick={() => removeImage(url)}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploadField;
