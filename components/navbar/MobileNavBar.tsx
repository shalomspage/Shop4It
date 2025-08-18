"use client";

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
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle className="text-center font-bold text-xl">
            Shoppit
          </SheetTitle>
        </SheetHeader>

        {/* Primary nav links */}
        <div className="flex flex-col gap-4 mt-6 text-lg font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/shop" className="hover:text-primary transition-colors">
            Shop
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        {/* Auth / Cart / Profile (from NavItems) */}
        <div className="mt-8">
          <NavItems mobile />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
