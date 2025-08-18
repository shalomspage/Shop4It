"use client";

import Link from "next/link";
import { FaCartShopping } from "react-icons/fa6";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; 

export default function CartIcon() {
 

 
  const cartItems = useSelector((state: RootState) => state.cart.items); 

  const cartCount = cartItems?.length || 0;



  return (
    <Link href="/cart" className="relative">
      <div className="flex items-center h-[30px] w-[30px] justify-center cursor-pointer">
        <FaCartShopping className="text-4xl" />
        {cartCount > 0 && (
          <span className="absolute top-[-10] right-4 bg-red-500 text-white text-xs rounded-full px-1">
            {cartCount}
          </span>
        )}
      </div>
    </Link>
  );
}
