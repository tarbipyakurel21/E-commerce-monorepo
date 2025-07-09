import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ProductsPage.css';
import { fetchProducts } from '../api/product';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  useEffect(() => {
    fetchProducts()
      .then((res) => {
        const data = res.data;
        const filtered = category ? data.filter(p => p.category === category) : data;
        setProducts(filtered);
      })
      .catch((err) => {
        console.error("Error loading products", err);
        if (err.response?.status === 401) window.location.href = '/login';
      })
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">All Products</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row justify-content-center g-4">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={product.id}>
              <div className="card h-100 shadow-sm text-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: '160px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-sm btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
