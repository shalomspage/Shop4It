"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Spinner from "@/components/common/Spinner"; // adjust path if different

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        ✅ Order Placed Successfully!
      </h1>
      <p className="text-gray-700 mb-2">
        Thank you for your purchase. Your order has been received and is being
        processed.
      </p>

      {orderId && (
        <p className="text-lg font-semibold text-gray-800 mb-6">
          📦 Order ID: <span className="text-blue-600">{orderId}</span>
        </p>
      )}

      <Link href="/" className="default-btn px-6 py-3 rounded-lg">
        Back to Home
      </Link>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Spinner lg />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
