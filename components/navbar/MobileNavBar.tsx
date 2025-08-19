"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "./NaveItems";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";

const MobileNavbar = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <RxHamburgerMenu className="text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="text-center font-bold text-xl">
            Shop4It
          </SheetTitle>
        </SheetHeader>

        {/* Primary nav links */}
        <div className="flex flex-col gap-4 mt-6 text-lg font-medium items-center">
          <Link
            href="/"
            onClick={handleClose}
            className="hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={handleClose}
            className="hover:text-primary transition-colors"
          >
            Products
          </Link>
          <Link
            href="/contact"
            onClick={handleClose}
            className="hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </div>

        {/* Auth / Cart / Profile (from NavItems) */}
        <div className="mt-8" onClick={handleClose}>
          <NavItems mobile />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
