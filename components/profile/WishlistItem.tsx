"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/hooks";
import { removeFromWishlist } from "@/app/features/wishlistSlice";

type WishlistItemProps = {
  item: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
};

const WishlistItem = ({ item }: WishlistItemProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return (
    <li className="flex items-center justify-between py-4 flex-wrap gap-2">
      {/* Product Info */}
      <div className="flex items-center gap-4 ">
        <div className="w-16 h-16 relative flex-shrink-0">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover rounded"
          />
        </div>
        <div>
          <p className="font-semibold">{item.title}</p>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          className="text-blue-500 text-sm hover:underline cursor-pointer"
          onClick={() => router.push(`/products/${item.id}`)}
        >
          View
        </button>
        <button
          className="text-red-500 text-sm hover:underline cursor-pointer"
          onClick={() => dispatch(removeFromWishlist(item.id))}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default WishlistItem;
