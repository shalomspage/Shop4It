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
      <div className="flex flex-wrap gap-2 mb-6 sm:justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-3 py-2 sm:px-4 sm:py-2 
              rounded-md 
              font-medium 
              transition 
              text-sm 
              ${activeTab === tab.id ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-700 hover:bg-green-700 hover:text-white"}
            `}
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
