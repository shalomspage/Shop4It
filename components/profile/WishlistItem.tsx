import Image from "next/image";

interface WishlistItemProps {
  id: string;
  title: string;
  price: number;
  image: string;
}

const WishlistItem = ({ id, title, price, image }: WishlistItemProps) => {
  return (
    <div className="border rounded-lg shadow-sm p-3 flex flex-col items-center">
      <Image
        src={image}
        alt={title}
        width={120}
        height={120}
        className="rounded-md object-cover"
      />
      <h3 className="mt-2 text-sm font-medium text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">${price.toFixed(2)}</p>
      <button className="mt-2 text-sm text-red-600 hover:underline">
        Remove
      </button>
    </div>
  );
};

export default WishlistItem;
