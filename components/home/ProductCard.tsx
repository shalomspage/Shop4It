import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/app/types"

interface Props {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const imageSrc = product.imageUrl?.[0] || "/placeholder.png"

  return (
    <Link href={`/products/${product.id}`}>
      <div className="w-full max-w-[260px] rounded-lg shadow-md bg-white flex flex-col items-center gap-4 px-5 py-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer">

        <div className="w-[200px] h-[200px] rounded-md overflow-hidden">
          <Image
            src={imageSrc}
            alt={product.title}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="text-center text-lg font-semibold text-gray-800">
          {product.title}
        </p>
        <p className="text-[18px] text-center font-bold text-black">
          ${product.price}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
