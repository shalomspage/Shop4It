import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/app/types"
import { ShoppingCart } from "lucide-react" // optional, for Buy Now icon
import StarRating from "../star-rating/page"

interface Props {
  product: Product
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const imageSrc = product.imageUrl?.[0] || "/placeholder.png"

  return (
    
    <div className="w-[280px] bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-xl hover:scale-[1.02] cursor-pointer">
     
     {/* Top Image Section */}
<div className="relative w-full h-[220px] p-[2px] bg-gray-200 dark:bg-gray-700 rounded-2xl">
  <Image
    src={imageSrc}
    alt={product.title}
    fill
    className="object-cover rounded-2xl"
  />

  {/* Badge */}
  <span className="absolute top-4 left-4 bg-green-900/40 text-white text-xs px-3 py-1 rounded-full shadow backdrop-blur-lg">
    Best Seller
  </span>

  {/* Logo (replace with your own logo if needed) */}
  {/* <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-1 shadow">
    <Image
      src="/nike-logo.png" // update with your brand/logo
      alt="brand"
      width={20}
      height={20}
    />
  </div> */}
</div>


      {/* Product Info */}
      <div className="p-4 flex flex-col gap-1">
        <h3 className="text-sm font-semibold text-gray-900">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>

        {/* Price + Buy Now */}
        <div className="mt-4 flex items-center justify-between">
          <span className="bg-gray-100 px-3 py-1 rounded-full font-medium text-green-800">
            ${product.price}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="bg-gray-700 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-800 transition"
          >
            Buy Now <ShoppingCart size={16} />
          </Link>
        </div>
        <StarRating
        size={15}
        className="mt-2 mb-2"
        />
      </div>
    </div>
  )
}

export default ProductCard
