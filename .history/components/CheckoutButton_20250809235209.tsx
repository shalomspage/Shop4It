
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function CheckoutButton() {
  const router = useRouter();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);
  const initialized = useSelector((s: RootState) => s.auth.initialized);

  const handleCheckout = () => {
    if (!initialized) {
      // optional: show toast "Checking authentication..."
      return;
    }
    if (!isAuthenticated) {
      router.push("/auth/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <button onClick={handleCheckout} className="mt-6 bg-green-600 text-white px-4 py-2 rounded">
      Checkout
    </button>
  );
}
