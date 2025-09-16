import React from "react";
import MiniProductCard from "./MiniProductCard";

interface OrderItem {
  id: number;
  product: number | null; // pk
  title?: string;
  price?: number;
  image?: string | null;
  quantity: number;
}

interface IndividualOrderProps {
  order: {
    id: number;
    status: string;
    created_at: string;
    total_price: string;
    items: OrderItem[];
  };
}

const IndividualOrder: React.FC<{ order: IndividualOrderProps["order"] }> = ({ order }) => {
  const calcTotal = order.items.reduce((sum, item) => {
    const price = item.price ?? 0;
    const qty = item.quantity ?? 0;
    return sum + Number(price) * Number(qty);
  }, 0);

  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white mb-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-50 px-4 py-3 border-b">
        <p className="text-sm sm:text-base font-medium text-gray-800">
          ORDER ID:{" "}
          <span className="text-green-600 font-semibold">#{order.id}</span>
        </p>
        <div className="flex gap-3 items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium
              ${
                order.status === "PENDING"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "PROCESSING"
                  ? "bg-blue-100 text-blue-800"
                  : order.status === "SHIPPED"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-green-100 text-green-800"
              }`}
          >
            {order.status}
          </span>
          <small className="text-gray-500 text-xs sm:text-sm">
            {new Date(order.created_at).toLocaleDateString()}
          </small>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {order.items.map((item) =>
          item.title || item.image || item.price !== undefined ? (
            <MiniProductCard
              key={item.id}
              product={{
                id: item.product ?? item.id,
                image: item.image ?? null,
                title: item.title ?? "Unknown product",
                price: item.price,
              }}
            />
          ) : (
            <div
              key={item.id}
              className="border p-4 rounded bg-gray-50 text-gray-500 text-sm flex flex-col items-center justify-center"
            >
              <p>Product details unavailable</p>
              <p>Qty: {item.quantity}</p>
            </div>
          )
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t flex justify-end">
        <p className="font-bold">Total: ${calcTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default IndividualOrder;
