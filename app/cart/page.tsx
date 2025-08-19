"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, updateQuantity } from "@/app/features/cartSlice";
import { RootState } from "@/redux/store";
import CheckoutButton from "@/components/CheckoutButton";

export default function CartPage() {
  const { items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const grandTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return <p className="min-h-screen max-w-4xl mx-auto p-6">Your cart is empty.</p>;
  }

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-6 px-16">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <ul className="space-y-4">
        {items.map(item => (
          <li
            key={item.id}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-4 gap-4"
          >
            {/* Product Image */}
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price + Actions */}
            <div className="flex flex-col items-end gap-2">
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              <div className="flex gap-2">
                <Link
                  href={`/products/${item.id}`}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Edit
                </Link>
                <button
                  className="text-red-500 text-sm cursor-pointer"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Grand Total */}
      <div className="mt-6 flex justify-between items-center border-t pt-4">
        <p className="font-bold text-lg">Total:</p>
        <p className="font-bold text-lg">${grandTotal.toFixed(2)}</p>
      </div>

      <div className="mt-6 flex justify-between gap-4">
        <button
          onClick={() => dispatch(clearCart())}
          className="nav-btn-delete"
        >
          Clear Cart
        </button>
        <CheckoutButton />
      </div>
    </div>
  );
}
