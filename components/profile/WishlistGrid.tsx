import WishlistItem from "./WishlistItem";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface WishlistGridProps {
  products: Product[];
}

const WishlistGrid = ({ products }: WishlistGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <WishlistItem key={product.id} {...product} />
      ))}
    </div>
  );
};

export default WishlistGrid;
