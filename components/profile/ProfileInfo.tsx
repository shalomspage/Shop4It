"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProfileInfo = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <p className="text-gray-500">Loading profile...</p>;
  }

  const displayName =
    `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.username;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Profile Information</h2>
      <p className="text-gray-700">Name: {displayName}</p>
      <p className="text-gray-700">Email: {user.email}</p>
    </div>
  );
};

export default ProfileInfo;
