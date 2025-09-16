
"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import IndividualOrder from "../order/IndividualOrder";
import Spinner from "../common/Spinner";

type OrderItem = {
  id: number;
  product: number | null;
  title?: string;
  price?: number;
  image?: string | null;
  quantity: number;
};

type Order = {
  id: number;
  order_id?: string;
  status: "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | string;
  created_at: string;
  total_price: string;
  items: OrderItem[];
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/order/`, {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch orders: ${res.status}`);
        }

        const data = (await res.json()) as Order[];

        // safety mapping: ensure items include title/price/image keys (fallbacks)
        const safeData = data.map((o) => ({
          ...o,
          items: (o.items || []).map((it) => ({
            id: it.id,
            product: it.product ?? null,
            title: it.title ?? (it.product ? "Product" : "Unknown"),
            price: it.price !== undefined ? Number(it.price) : undefined,
            image: it.image ?? null,
            quantity: it.quantity ?? 1,
          })),
        }));

        setOrders(safeData);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <div className="flex items-center justify-center">
    <Spinner lg/>
  </div>;

  return (
    <div>
      <h1 className="text-xl font-bold">My Orders</h1>

      {orders.length > 0 ? (
        orders.map((order) => <IndividualOrder key={order.id} order={order} />)
      ) : (
        <p className="text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
};

export default MyOrdersPage;
