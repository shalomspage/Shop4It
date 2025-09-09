"use client";

import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import Orders from "./Orders";
import Wishlist from "./Wishlist";

const tabs = [
  { id: "info", label: "Profile Info" },
  { id: "orders", label: "Orders" },
  { id: "wishlist", label: "Wishlist" },
];

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="w-full">
      {/* Tab buttons */}
      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-md font-medium transition ${
              activeTab === tab.id
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {activeTab === "info" && <ProfileInfo />}
        {activeTab === "orders" && <Orders />}
        {activeTab === "wishlist" && <Wishlist />}
      </div>
    </div>
  );
};

export default ProfileTabs;
