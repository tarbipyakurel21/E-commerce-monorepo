import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../api/payments';

// stripe client key
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

// Main Payment Page
const PaymentPage = () => {
  // get the order id from the url 
  const { orderId } = useParams();
  // get client secret from backend
  const [clientSecret, setClientSecret] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await createPaymentIntent(orderId); // Returns { clientSecret, order }
        //set client secret and order items
        setClientSecret(response.clientSecret);
        setOrder(response.order);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
        toast.error('Could not initialize payment.');
      }
    };

    fetchClientSecret();
  }, [orderId]);

  // if one of them doesn't exist say loading
  if (!clientSecret || !order) return <p className="text-center mt-5">Loading payment form...</p>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">Payment for Order #{orderId}</h2>

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
          <strong>Subtotal</strong>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <strong>Tax</strong>
          <span>${order.tax.toFixed(2)}</span>
        </div>
        <div className="d-flex justify-content-between">
          <strong>Total</strong>
          <span>${order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Stripe Payment Form */}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} orderId={orderId} />
      </Elements>
    </div>
  );
};
// Inner component for the Stripe form
const PaymentForm = ({ clientSecret, orderId }) => {
  // use stripe elements 
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    setLoading(true);

    try {
      // create payment intent in payment-service backend
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: 'User',
          },
        },
      });

      if (error) {
        console.error('Payment error:', error);
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        navigate('/orders');
      }
    } catch (err) {
      console.error('Stripe error:', err);
      toast.error('Something went wrong during payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" className="btn btn-primary mt-3" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </form>
  );
};


export default PaymentPage;
