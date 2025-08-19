import React from 'react';
import MiniProductCard from './MiniProductCard';

// Define a type for the product (adjust fields if needed)
interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

const IndividualOrder = () => {
  // Sample order items
  const orderItems: Product[] = [
    { id: '1', title: 'Sample Product 1', price: 29.99, image: '/images/sample1.jpg' },
    { id: '2', title: 'Sample Product 2', price: 49.99, image: '/images/sample2.jpg' },
    { id: '3', title: 'Sample Product 3', price: 19.99, image: '/images/sample3.jpg' },
    { id: '4', title: 'Sample Product 4', price: 39.99, image: '/images/sample4.jpg' },
  ];

  return (
    <div className="w-full border border-gray-200 bg-white px-4 py-4 rounded-lg shadow-sm">
      {/* Order Header */}
      <div className="w-full bg-gray-50 px-4 py-3 rounded-md flex items-center justify-between shadow-sm border border-gray-200">
        <p className="text-sm sm:text-base font-medium text-gray-800 max-sm:hidden">
          ORDER ID:{" "}
          <span className="text-green-600 font-semibold">
            PO-147-17039646431273026
          </span>
        </p>
        <small className="text-gray-500 text-xs sm:text-sm">23 Feb 2025</small>
      </div>

      {/* Order Items */}
      <div className="w-full py-4 flex items-center gap-4 custom-overflow">
        {orderItems.map((item) => (
          <MiniProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
};

export default IndividualOrder;
