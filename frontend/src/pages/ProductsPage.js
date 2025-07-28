import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';

const ProductsPage = () => {
  // to figure out which category is displaying
  const location = useLocation();
  const navigate = useNavigate();

  const { addItem } = useCart(); // using CartContext for cart actions
  const { products, status, loadProducts, searchProducts } = useProduct(); // using ProductContext

  //use location.search to find out category and display accordingly
  const query = new URLSearchParams(location.search);
  const category = query.get("category") || "All";
  const search = query.get("search") || "";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (search || (category && category !== "All")) {
          //search products with name and optionally category
          await searchProducts(search, category === "All" ? "" : category);
        } else {
          //fetch products by category
          await loadProducts(category === "All" ? "" : category);
        }
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    loadProducts();
  }, [search, category, loadProducts, searchProducts]);
  

  return (
    <div className="container-fluid py-4 d-flex justify-content-center">
      <div style={{ maxWidth: '1200px', width: '100%' }}>
        {status === 'loading' ? (
          <p className="text-center">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center">No products found.</p>
        ) : (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
            {products.map((product) => (
              <div key={product.id} className="col">
                <div
                  className="bg-white h-100 p-2 rounded border product-tile"
                  style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                  onClick={() => navigate(`/product/${product.id}`)}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div className="d-flex justify-content-center align-items-center" style={{ height: '260px' }}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div className="mt-2 px-1">
                    <p className="fw-semibold mb-1 text-truncate" style={{ fontSize: '0.95rem' }}>{product.name}</p>
                    <p className="text-muted small mb-1 text-truncate">{product.description}</p>
                    <p className="fw-bold text-dark mb-1">${product.price}</p>
                    <p className="text-success small mb-2">In Stock: {product.quantity}</p>
                    <button
                      className="btn btn-sm btn-warning w-100"
                      onClick={(e) => {
                        // using e.stop to prevent click to 
                        //automatically go to productDetailsPage
                        e.stopPropagation();
                        addItem(product); // using CartContext addItem directly
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
