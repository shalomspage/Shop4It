import React from 'react'
import Image from "next/image"



interface MiniProductCardProps {
  product: {
  id: string;
  image: string;
  title: string;
  price: number;
};
}

const MiniProductCard: React.FC<MiniProductCardProps> = ({ product }) => {
  if (!product) return null; 
  return (
    <div className="rounded-lg shadow-md bg-white flex flex-col items-center px-4 py-5 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
      <div className="w-[160px] h-[160px] rounded-md overflow-hidden">
        <Image
          src={product.image}
          className="object-cover w-full h-full"
          width={200}
          height={200}
          alt={product.title}
        />
      </div>

      <p className="text-center text-base font-medium text-gray-800">{product.title}</p>
      <p className="text-[16px] text-center font-bold text-black">${product.price.toFixed(2)}</p>
    </div>
  )
}

export default MiniProductCard
