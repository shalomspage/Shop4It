"use client";

export default function RecentOrders() {
  const orders = [
    { id: "ORD123", customer: "John Doe", total: "$250", status: "Pending" },
    { id: "ORD124", customer: "Jane Smith", total: "$120", status: "Completed" },
    { id: "ORD125", customer: "Alex Lee", total: "$560", status: "Shipped" },
  ];

  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-gray-500 border-b">
          <tr>
            <th className="pb-2">Order ID</th>
            <th className="pb-2">Customer</th>
            <th className="pb-2">Total</th>
            <th className="pb-2">Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
