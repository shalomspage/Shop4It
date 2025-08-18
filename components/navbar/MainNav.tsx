"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mainNav = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const MainNav = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-6">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={` ${
            pathname === item.href ? "text-green-600 font-semibold" : ""
          }`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
