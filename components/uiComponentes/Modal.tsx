import React from "react";

import Button from "./Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

interface Props {
  children: React.ReactNode;
}

const Modal = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="default-btn max-sm:text-[12px] max-sm:px-4 my-6">
          Click to add a review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Are you absolutely sure?</DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};


export default Modal;