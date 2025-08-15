import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavItems from "./NaveItems";
import { RxHamburgerMenu } from "react-icons/rx";

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <RxHamburgerMenu className="text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle className="text-center font-bold text-xl">
            Shoppit
          </SheetTitle>
        </SheetHeader>

        <NavItems mobile />

        {/* <SheetClose className="overflow-y-auto">
          <NavItems mobile />
        </SheetClose> */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;