'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
import { createPaymentIntent } from '@/services/payment';
import { getOrderById, OrderResponse } from '@/services/orders';
import { useParams } from 'next/navigation';
import { toast } from '@/components/toast';
import Loader from '@/components/Loader';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentPage = () => {
  const { orderId } = useParams();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!orderId) return;
        const { clientSecret } = await createPaymentIntent(orderId as string);
        setClientSecret(clientSecret);

        const orderData = await getOrderById(orderId as string);
        setOrder(orderData);
      } catch (err: any) {
        console.error('Failed to initialize payment:', err);
        toast.error(err?.response?.data?.message || 'Could not load payment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  if (loading || !orderId || !clientSecret || !order) return <Loader />;

  if (order.status === 'PAID') {
    return (
      <div className="container py-5 text-center">
        <h2 className="text-success">✅ Order #{orderId} has already been paid.</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Pay for Order #{orderId}</h2>

      {/* Order Summary */}
      <div className="mb-4 p-3 border rounded bg-light">
        {order.items.map((item, idx) => (
          <div key={idx} className="d-flex justify-content-between">
            <div>{item.productName} x {item.quantity}</div>
            <div>${(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between">
          <span>Subtotal:</span>
          <span>${order.subtotal?.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span>Tax (7%):</span>
          <span>${order.tax?.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between fw-bold mt-2">
          <strong>Total:</strong>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>

      {/* Stripe Form */}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} orderId={orderId as string} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
