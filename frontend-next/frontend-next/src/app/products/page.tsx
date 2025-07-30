"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProducts, useFilteredProducts } from '@/hooks/products';
import { useAppDispatch} from '@/redux/hooks';
import type {Product}  from '@/services/product';
import ErrorFallback from '@/components/ErrorFallback';
import { addToCart } from '@/redux/cartSlice';
import Loader from '@/components/Loader';

const ProductsPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const category = searchParams.get("category") || '';
  const search = searchParams.get("search") || '';


  const handleAdd = (productId: number) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const {
    data: products,
    isLoading,
    isError,
  } = search || category
    ? useFilteredProducts(search, category)
    : useProducts();

  if(isLoading) return <Loader/>;
  if (isError || !products) {return (<ErrorFallback
  message="Failed to load products. Please try again."
  onRetry={() => window.location.reload()} // optional, or use window.location.reload()
/>);}
  if (products.length === 0) return <p className="text-center">No products found.</p>;

  return (
    <div className="container-fluid py-4 d-flex justify-content-center">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product:Product) => (
            <div key={product.id} className="col">
              <div
                className="bg-white h-100 p-2 rounded border product-tile"
                style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => router.push(`/products/${product.id}`)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
              >
                <div className="d-flex justify-content-center align-items-center" style={{ height: '260px' }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div className="mt-2 px-1">
                  <p className="fw-semibold mb-1 text-truncate" style={{ fontSize: '0.95rem' }}>
                    {product.name}
                  </p>
                  <p className="text-muted small mb-1 text-truncate">{product.description}</p>
                  <p className="fw-bold text-dark mb-1">${product.price}</p>
                  <p className="text-success small mb-2">In Stock: {product.quantity}</p>
                  <button
                    className="btn btn-sm btn-warning w-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(product.id);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPageClient;
