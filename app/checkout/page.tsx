"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import OrderSummary from "@/components/checkout/OrderSummary";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { clearCart } from "../features/cartSlice";



interface CheckoutFormData {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string; 
  postal_code: string;
}

const CheckoutPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // 🔹 form state
  const [formData, setFormData] = useState<CheckoutFormData>({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "", 
    postal_code: "",
  });

  // 🔹 Redux state
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const items = useSelector((state: RootState) => state.cart.items);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, mounted, router]);

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }




const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/checkout/`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  },
  body: JSON.stringify({
    ...formData,
    total_price: items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    items: items.map((item) => ({
      product: item.id,
      quantity: item.quantity,
      price: item.price,
    })),
  }),
});


    const data = await res.json();
    console.log("Checkout response:", data);

    if (res.ok) {
      dispatch(clearCart());  
      router.push(`/checkout/success?order_id=${data.order_id}`);
    } else {
      alert("❌ Failed: " + JSON.stringify(data));
    }
  } catch (err) {
    console.error("Checkout error:", err);
  } finally {
    setLoading(false);
  }
};




  return (
    <div className="min-h-[80vh] max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Form */}
        <CheckoutForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          loading={loading}
        />

        {/* Order Summary */}
        <OrderSummary items={items} />
      </div>
    </div>
  );
};

export default CheckoutPage;
