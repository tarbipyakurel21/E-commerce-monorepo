import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent } from '../api/payments';

const stripePromise = loadStripe('pk_test_51ReKDrKxCpE1OpusTBFff8b6O9YaDgeZs7EgDIwDITyfBfY5WTxq9PtT2E9kq76n62G2YNmD1b9oSxzyOm5zGShU00FCs50omc');

// Inner component to handle the Stripe form
const PaymentForm = ({ clientSecret, orderId }) => {
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

// Main component
const PaymentPage = () => {
  const { orderId } = useParams();
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await createPaymentIntent(orderId);
        setClientSecret(response);
      } catch (err) {
        console.error('Failed to create payment intent:', err);
        toast.error('Could not initialize payment.');
      }
    };

    fetchClientSecret();
  }, [orderId]);

  if (!clientSecret) return <p>Loading payment form...</p>;

  return (
    <div className="container py-5">
      <h2>Payment for Order #{orderId}</h2>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm clientSecret={clientSecret} orderId={orderId} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
