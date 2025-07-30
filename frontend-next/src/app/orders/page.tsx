'use client';

import React, { useEffect, useState } from 'react';
import { getUserOrders, OrderResponse } from '@/services/orders';
import { motion } from 'framer-motion';
import Loader from '@/components/Loader';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to fetch user orders', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const renderStatusBadge = (status: string) => {
    const baseClass = 'px-2 py-1 rounded text-sm font-medium';
    switch (status) {
      case 'Delivered':
        return <span className={`${baseClass} bg-green-100 text-green-700`}>{status}</span>;
      case 'Processing':
        return <span className={`${baseClass} bg-yellow-100 text-yellow-800`}>{status}</span>;
      default:
        return <span className={`${baseClass} bg-gray-200 text-gray-700`}>{status}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Your Orders</h2>

      {loading ? (
       <Loader/>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12">
          <img src="/error.png" alt="No orders" className="w-44 h-44 mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Orders Yet</h3>
          <p className="text-gray-600 mb-4">Looks like you haven’t placed any orders yet.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-500 hover:bg-amber-600 text-black px-5 py-2 rounded-lg shadow transition-colors"
            onClick={() => window.location.href = '/products'}
          >
            🛍️ Shop Now
          </motion.button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white shadow-sm rounded-md p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <h5 className="text-lg font-semibold">Order #{order.orderId}</h5>
                {renderStatusBadge(order.status)}
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Date:</strong>{' '}
                {order.createdAt && !isNaN(new Date(order.createdAt).getTime())
                  ? new Date(order.createdAt).toLocaleDateString()
                  : 'N/A'}
              </p>
              <p className="text-sm text-gray-700 mb-1">
                <strong>Items:</strong>{' '}
                {order.items && order.items.length > 0
                  ? order.items.map(item => `${item.productName} (x${item.quantity})`).join(', ')
                  : 'No items'}
              </p>
              <p className="text-sm text-gray-700">
  <strong>Subtotal:</strong> ${order.subtotal?.toFixed(2)}
</p>
<p className="text-sm text-gray-700">
  <strong>Tax:</strong> ${order.tax?.toFixed(2)}
</p>
<p className="text-sm font-semibold text-gray-900">
  <strong>Total:</strong> ${order.totalAmount?.toFixed(2)}
</p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
