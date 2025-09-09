"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { removeFromWishlist, clearWishlist } from "@/app/features/wishlistSlice";

const Wishlist = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const wishlistItems = useAppSelector(
    (state) => state.wishlist?.items || []
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">My Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div>
          {/* Clear All Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => dispatch(clearWishlist())}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
            >
              Clear All
            </button>
          </div>

          {/* Wishlist Items */}
          <ul className="divide-y divide-gray-200">
            {wishlistItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
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
                    <p className="text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </p>
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
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
