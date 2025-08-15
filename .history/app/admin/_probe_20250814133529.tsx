"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function AdminProbe() {
  const auth = useSelector((s: RootState) => s.auth);
  return (
    <pre className="p-4 text-sm bg-gray-100 rounded-md overflow-auto">
      {JSON.stringify(auth, null, 2)}
    </pre>
  );
}
