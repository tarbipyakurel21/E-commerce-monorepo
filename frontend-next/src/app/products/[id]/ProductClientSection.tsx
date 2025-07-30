'use client';

import React from 'react';
import { Product } from '@/services/product';
import { useAppDispatch } from '@/redux/hooks';
import { addToCart } from '@/redux/cartSlice';
import { useRouter } from 'next/navigation';

interface Props {
  product: Product;
  related: Product[];
}

const ProductClientSection: React.FC<Props> = ({ product, related }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAdd = () => {
    dispatch(addToCart({ productId: product.id, quantity: 1 }));
  };

  return (
    <>
      {/* Product Details Section */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full object-contain max-h-96"
          />
        </div>

        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">${product.price}</p>
          <p className="text-sm text-green-600 mb-4">
            In Stock: {product.quantity}
          </p>

          {/* Blue Add to Cart button */}
          <button
            className="w-full text-white font-medium py-2 px-4 rounded transition bg-blue-600 hover:bg-blue-700"
            onClick={handleAdd}
          >
            ➕ Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/products/${item.id}`)} // ✅ Navigate to the clicked product page
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-40 object-cover mb-2 rounded"
                />
                <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">${item.price}</p>

                {/* Stop event propagation for Add to Cart */}
                <button
                  className="w-full text-white font-medium py-1 px-3 rounded transition bg-blue-600 hover:bg-blue-700"
                  onClick={(e) => {
                    e.stopPropagation(); // prevent navigating to detail page
                    dispatch(addToCart({ productId: item.id, quantity: 1 }));
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductClientSection;
