"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { clearWishlist } from "@/app/features/wishlistSlice";
import WishlistItem from "./WishlistItem";

const Wishlist = () => {
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
              <WishlistItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
