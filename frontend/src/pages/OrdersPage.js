// src/pages/OrdersPage.js
import React from 'react';

const OrdersPage = () => {
  const orders = [
    {
      id: 'ORD12345',
      date: '2025-06-15',
      status: 'Delivered',
      total: 89.99,
      items: ['Wireless Mouse', 'USB-C Hub'],
    },
    {
      id: 'ORD12346',
      date: '2025-06-10',
      status: 'Processing',
      total: 120.5,
      items: ['Bluetooth Speaker'],
    },
  ];

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>You have no recent orders.</p>
      ) : (
        <div className="list-group">
          {orders.map(order => (
            <div key={order.id} className="list-group-item mb-3 border rounded p-3">
              <h5>Order #{order.id}</h5>
              <p className="mb-1"><strong>Date:</strong> {order.date}</p>
              <p className="mb-1"><strong>Status:</strong> {order.status}</p>
              <p className="mb-1"><strong>Items:</strong> {order.items.join(', ')}</p>
              <p className="mb-0"><strong>Total:</strong> ${order.total}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;