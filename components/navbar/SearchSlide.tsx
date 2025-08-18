"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import SearchForm from "./SearchForm";

const SearchSlide = () => {
  return (
    <Sheet>
      {/* Trigger button (search icon) */}
      <SheetTrigger asChild>
        <button className="p-2 rounded-full bg-black text-white">
          <Search className="size-5" />
        </button>
      </SheetTrigger>

      {/* Slide-out content from the LEFT */}
      <SheetContent side="left" className="p-6 w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-lg font-bold text-center">
            Search Products
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          <SearchForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSlide;
