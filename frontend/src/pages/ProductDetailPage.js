import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
  // use params to find id
  const { id } = useParams();
  const navigate = useNavigate();
  // fetch from ai recommendations service later
  const [recommendations, setRecommendations] = useState([]);
  // use productContext
  const { products, productDetails, fetchProduct, fetchProducts, status } = useProduct();
  //use cartcontext
  const { addItem } = useCart();

  useEffect(() => {
    fetchProduct(id);
    fetchProducts(); // ensure all products are loaded for recommendations
  }, [id, fetchProduct, fetchProducts]);

  useEffect(() => {
    //set as many recommendations using slice and filter
    if (products && productDetails) {
      const similar = products.filter(p =>
        p.category === productDetails.category && p.id !== productDetails.id
      ).slice(0, 8);
      setRecommendations(similar);
    }
  }, [products, productDetails]);

  if (status === 'loading' || !productDetails) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="row mb-5 align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={productDetails.imageUrl}
            alt={productDetails.name}
            className="img-fluid"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{productDetails.name}</h2>
          <p className="text-muted">{productDetails.description}</p>
          <h4 className="text-dark fw-bold mb-3">${productDetails.price}</h4>
          <p className={`fw-semibold ${productDetails.quantity > 0 ? 'text-success' : 'text-danger'}`}>
            {productDetails.quantity > 0 ? `In Stock: ${productDetails.quantity}` : 'Out of Stock'}
          </p>
          <button
            className="btn btn-warning btn-lg mt-3"
            onClick={() => addItem(productDetails)}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <h4 className="mb-4 fw-semibold">Recommended for you</h4>
      <div className="row g-3">
        {recommendations.map((rec) => (
          <div key={rec.id} className="col-6 col-sm-4 col-md-3">
            <div
              className="bg-white border rounded p-2 h-100 text-center shadow-sm"
              style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
              onClick={() => navigate(`/product/${rec.id}`)}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <img
                src={rec.imageUrl}
                alt={rec.name}
                className="mb-2"
                style={{ maxHeight: '160px', width: '100%', objectFit: 'contain' }}
              />
              <h6 className="text-truncate">{rec.name}</h6>
              <p className="text-dark fw-bold mb-0">${rec.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
