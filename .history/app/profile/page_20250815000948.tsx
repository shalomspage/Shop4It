"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MiniProductCard from "@/components/order/MiniProductCard";
import PurchasedOrder from "@/components/order/PurchasedOrder";
import { useAppSelector } from "../hooks";

const ProfilePage = () => {
  const router = useRouter();
  const { isAuthenticated, initialized } = useAppSelector(
    (state) => state.auth
  );

  const [activeTab, setActiveTab] = useState<"orders" | "wishlist">("orders");


  const wishlistItems = useAppSelector(
    (state) => state.wishlist?.items || []
  );


  useEffect(() => {
    if (initialized && !isAuthenticated) {
      router.replace("/login");
    }
  }, [initialized, isAuthenticated, router]);

  if (!initialized) {
    return <p className="min-h-screen text-center mt-20">Loading...</p>;
  }

  return (
    <section className="min-h-screen main-max-width padding-x mx-auto my-10">
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "orders"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("orders")}
          aria-selected={activeTab === "orders"}
          role="tab"
        >
          Purchased Orders
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "wishlist"
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("wishlist")}
          aria-selected={activeTab === "wishlist"}
          role="tab"
        >
          Wishlist
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "orders" && (
        <div role="tabpanel" aria-labelledby="orders-tab">
          <PurchasedOrder />
        </div>
      )}

      {activeTab === "wishlist" && (
        <div role="tabpanel" aria-labelledby="wishlist-tab">
          <h2 className="text-center text-2xl font-bold text-gray-800 mt-2 mb-4 max-sm:text-[16px]">
            Products added to Wishlist
          </h2>

          {wishlistItems.length === 0 ? (
            <p className="text-center text-gray-600">Your wishlist is empty.</p>
          ) : (
            <div className="flex flex-wrap gap-4 justify-center px-6 py-6 border border-gray-200 bg-white rounded-lg shadow-sm">
              {wishlistItems.map((item) => (
                <MiniProductCard key={item.id} product={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ProfilePage;
