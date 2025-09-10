"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,updateQuantity,
} from "@/app/features/cartSlice";
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

  const subtotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 8 : 0; // example flat shipping fee
  const grandTotal = subtotal + shipping;

  if (items.length === 0) {
    return (
      <p className="min-h-screen max-w-5xl mx-auto p-6 text-center text-gray-600">
        Your basket is empty.
      </p>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Your Basket</h1>

      {/* Cart Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="border-b bg-gray-50 text-left text-gray-600">
            <tr>
              <th className="py-3 px-4">Product</th>
              <th className="py-3 px-4">Description</th>
              {/* Remove this if your CartItem doesn’t support size */}
              {/* <th className="py-3 px-4">Size</th> */}
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Delete</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-none hover:bg-gray-50"
              >
                {/* Product image */}
                <td className="py-4 px-4">
                  <div className="w-16 h-20 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </td>

                {/* Description */}
                <td className="py-4 px-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    ${item.price.toFixed(2)} each
                  </p>
                </td>

                {/* Size column (optional, remove if not used) */}
                {/* <td className="py-4 px-4 text-gray-700">{item.size ?? "-"}</td> */}

                {/* Quantity controls */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="px-2 border rounded cursor-pointer"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 border rounded cursor-pointer"
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Price */}
                <td className="py-4 px-4 font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>

                {/* Remove */}
                <td className="py-4 px-4">
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:underline text-sm cursor-pointer"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     {/* Totals + Actions */}
<div className="mt-8 border-t pt-6 ">
  {/* Totals */}
  <div className="text-right mb-6">
    <p>Total products: ${subtotal.toFixed(2)}</p>
    <p>Estimated shipping costs: ${shipping.toFixed(2)}</p>
    <p className="font-bold text-lg text-green-700">Total: ${grandTotal.toFixed(2)}</p>
  </div>

  {/* Buttons aligned side by side */}
  <div className="flex justify-end gap-4 flex-wrap">
    <Link
      href="/products"
      className="default-btn"
    >
      Continue Shopping
    </Link>
    <CheckoutButton />
  </div>
</div>

    </div>
  );
}
