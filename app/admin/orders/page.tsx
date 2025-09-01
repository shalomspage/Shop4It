"use client";

import React from "react";

const orders = [
  { id: "ORD123", customer: "John Doe", total: "$250", status: "Pending" },
  { id: "ORD124", customer: "Jane Smith", total: "$120", status: "Completed" },
  { id: "ORD125", customer: "Alex Lee", total: "$560", status: "Shipped" },
  { id: "ORD126", customer: "Dwight Schrute", total: "$300", status: "Pending" },
  { id: "ORD127", customer: "Kevin Malone", total: "$80", status: "Completed" },
];

export default function OrdersPage() {
  return (
    <div className="max-w-7xl min-h-screen">
      <h2 className="text-xl font-semibold mb-6">All Orders</h2>

      <section className="bg-white rounded-lg shadow p-6">
        <table className="w-full text-sm text-left">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="pb-2">Order ID</th>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Total</th>
              <th className="pb-2">Status</th>
              <th className="pb-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-none">
                <td className="py-2">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="text-right">
                  <button className="text-blue-600 hover:underline text-sm">View</button>
                  <button className="ml-3 text-red-600 hover:underline text-sm">Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
