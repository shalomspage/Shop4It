import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "@/app/features/wishlistSlice";
import { RootState } from "@/redux/store";
import Button from "../uiComponentes/Button";

interface AddToWishlistButtonProps {
  product: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

const AddToWishlistButton = ({ product }: AddToWishlistButtonProps) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);


  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleAdd = () => {
    if (!isInWishlist) {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Button
      className="wish-btn"
      onClick={handleAdd}
      disabled={isInWishlist}
    >
      {isInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
    </Button>
  );
};

export default AddToWishlistButton;
