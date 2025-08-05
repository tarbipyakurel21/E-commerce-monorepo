"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProducts, useFilteredProducts } from '@/hooks/products';
import { useAppDispatch } from '@/redux/hooks';
import type { Product } from '@/services/product';
import ErrorFallback from '@/components/ErrorFallback';
import { addToCart } from '@/redux/cartSlice';
import Loader from '@/components/Loader';
import { toast } from '@/components/toast';
import { AxiosError } from 'axios';

const ProductsPageClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const category = searchParams.get("category") || '';
  const search = searchParams.get("search") || '';

  // ✅ Unconditional hook calls to comply with React rules
  const filtered = useFilteredProducts(search, category);
  const all = useProducts();

  // ✅ Decide which data to use
  const products = search || category ? filtered.data : all.data;
  const isLoading = search || category ? filtered.isLoading : all.isLoading;
  const isError = search || category ? filtered.isError : all.isError;

  const handleAdd = async (productId: number) => {
    try {
      await dispatch(addToCart({ productId, quantity: 1 })).unwrap();
      toast.success('✅ Added to cart!');
    } catch (error: unknown) {
      // ✅ Proper AxiosError check
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error('❌ Please sign in first!');
      } else {
        toast.error('❌ Failed to add product');
      }
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !products) {
    return (
      <ErrorFallback
        message="Failed to load products. Please try again."
        onRetry={() => window.location.reload()}
      />
    );
  }

  if (products.length === 0) return <p className="text-center">No products found.</p>;

  return (
    <div className="container-fluid py-4 d-flex justify-content-center">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map((product: Product) => (
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
                    className="btn btn-sm w-100 text-white"
                    style={{ backgroundColor: '#1D4ED8', borderColor: '#1D4ED8' }}
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
