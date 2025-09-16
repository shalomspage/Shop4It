import Image from "next/image";
import React from "react";

interface MiniProductCardProps {
  product: {
    id: number | string;
    title: string;
    image?: string | null;
    price?: number;
  };
}

const MiniProductCard: React.FC<MiniProductCardProps> = ({ product }) => {
  const fallback = "fallback.png";

  // Pre-compute the src safely
  let src: string = fallback;
  if (product.image) {
    if (product.image.startsWith("http")) {
      src = product.image;
    } else if (process.env.NEXT_PUBLIC_HOST) {
      src = `${process.env.NEXT_PUBLIC_HOST}${product.image}`;
    }
  }

  return (
    <div className="border rounded p-3 flex flex-col items-center">
      <div className="relative w-24 h-24">
        <Image
          src={src}
          alt={product.title}
          fill
          className="object-cover rounded"
        />
      </div>

      <p className="mt-2 text-sm font-medium text-gray-800">{product.title}</p>
      {product.price !== undefined && (
        <p className="text-xs text-gray-600">${product.price}</p>
      )}
    </div>
  );
};

export default MiniProductCard;
