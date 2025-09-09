interface WishlistHeaderProps {
  count: number;
}

const WishlistHeader = ({ count }: WishlistHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">My Wishlist</h2>
      <span className="text-sm text-gray-500">{count} items</span>
    </div>
  );
};

export default WishlistHeader;
