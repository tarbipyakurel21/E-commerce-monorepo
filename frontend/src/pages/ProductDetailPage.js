import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById, fetchProducts } from '../api/product';
import { useNavigate } from 'react-router-dom';
import useCartActions from '../hooks/useCartActions';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const navigate=useNavigate();
  const { handleAddToCart } = useCartActions();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchProductById(id);
        setProduct(res.data);
        const all = await fetchProducts();
        const similar = all.data.filter(p =>
          p.category === res.data.category && p.id !== res.data.id
        ).slice(0, 8); 
      setRecommendations(similar);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    load();
  }, [id]);


  if (!product) return <div className="text-center py-5">Loading...</div>;
  return (
    <div className="container py-5">
      <div className="row mb-5 align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">{product.description}</p>
          <h4 className="text-dark fw-bold mb-3">${product.price}</h4>
          <p className={`fw-semibold ${product.quantity > 0 ? 'text-success' : 'text-danger'}`}>
            {product.quantity > 0 ? `In Stock: ${product.quantity}` : 'Out of Stock'}
          </p>
          <button
            className="btn btn-warning btn-lg mt-3"
            onClick={() => handleAddToCart(product)} >
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
