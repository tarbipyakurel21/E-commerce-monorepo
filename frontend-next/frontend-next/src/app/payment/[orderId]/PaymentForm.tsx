'use client';

import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { clearCart } from '@/redux/cartSlice';
import { useAppDispatch } from '@/redux/hooks';

interface Props {
  clientSecret: string;
  orderId: string;
}

const PaymentForm: React.FC<Props> = ({ clientSecret, orderId }) => {
  const dispatch=useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Tarbi',
        },
      },
    });

    if (error) {
      toast.error(error.message || 'Payment failed');
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast.success('Payment successful!');
      dispatch(clearCart());
      router.push('/orders');
    }

    setLoading(false);
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

export default PaymentForm;
