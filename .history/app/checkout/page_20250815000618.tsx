"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";

const CheckoutPage = () => {
  const router = useRouter();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null; 

  return (
    <div className="min-h-[80vh] max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full p-3 border rounded"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full p-3 border rounded"
            />
            <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800">
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                       width={64}  
                       height={64}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <hr />
              <div className="flex justify-between font-bold text-lg mt-4">
                <span>Total:</span>
                <span>
                  $
                  {items
                    .reduce((total, item) => total + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
