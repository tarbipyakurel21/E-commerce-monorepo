// src/pages/OrdersPage.js
import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../api/orders';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserOrders()
      .then(data => setOrders(data))
      .catch(err => {
        console.error('Failed to fetch user orders', err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Your Orders</h2>

      {loading ? (
        <div className="text-center text-muted">Loading your orders...</div>
      ) : orders.length === 0 ? (
        <p className="text-center ">You have no recent orders.</p>
        
        
      ) : (
        <div className="row gy-4">
          {orders.map(order => (
            <div key={order.id} className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title mb-0">Order #{order.id}</h5>
                    <span className={`badge 
                      ${order.status === 'Delivered' ? 'bg-success' :
                        order.status === 'Processing' ? 'bg-warning text-dark' :
                        'bg-secondary'}
                    `}>
                      {order.status}
                    </span>
                  </div>
                  <p className="card-subtitle text-muted mb-1">
                    <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="mb-1">
                    <strong>Items:</strong> {order.items.join(', ')}
                  </p>
                  <p className="mb-0">
                    <strong>Total:</strong> ${Number(order.total).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
