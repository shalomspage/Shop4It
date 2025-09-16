"use client";
import Image from "next/image";
import React from "react";

interface Item {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items?: Item[]; // make it optional
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items = [] }) => {
  return (
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
              <p className="font-semibold text-green-700">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <hr />
          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total:</span>
            <span className="text-green-700">
              $
              {items
                .reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
