'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCart, addToCart, removeFromCart } from '@/redux/cartSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { createOrder } from '@/services/orders';
import { useAuth } from '@/context/AuthContext';
import Loader from '@/components/Loader';

const CartPageClient = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart.data);
  const status = useAppSelector((state) => state.cart.status);

  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  const handleAdd = (productId: number) => {
    dispatch(addToCart({ productId, quantity: 1 }));
  };

  const handleSubtract = (productId: number, currentQty: number) => {
    if (currentQty > 1) {
      dispatch(addToCart({ productId, quantity: -1 }));
    } else {
      dispatch(removeFromCart(productId));
    }
  };

  const handleCheckout = async () => {
    try {
      const orderItems =
        cart?.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })) ?? [];

      const order = await createOrder({ items: orderItems });
      router.push(`/payment/${order.orderId}`);
    } catch (err) {
      console.error('Checkout failed', err);
      toast.error('Could not proceed to payment.');
    }
  };

  if (authLoading || status === 'loading') {
    return <Loader/>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center mt-16 text-center px-4">
        <img src="/cart.png" alt="Sign in to view cart" className="w-32 h-32 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Please Sign In</h2>
        <p className="text-gray-600 mb-4">You must be logged in to view your cart.</p>
        <button
          className="bg-amber-500 text-black px-6 py-2 rounded-md hover:bg-amber-600 transition"
          onClick={() => router.push('/login')}
        >
          Sign In
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-16 text-center px-4">
        <img src="/cart.png" alt="Empty cart" className="w-32 h-32 mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Add items to your cart to see them here.</p>
        <button
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          onClick={() => router.push('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const subtotal = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800">Your Cart</h2>

        {cart.items.map((item) => (
          <div
            key={item.productName}
            className="flex gap-4 p-4 border rounded-lg shadow hover:shadow-md transition bg-white"
          >
            <img
              src="/cart.png"
              alt="Item image"
              className="w-24 h-24 object-cover rounded-lg border"
            />

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
              <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => handleSubtract(item.productId, item.quantity)}
                  className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
                >
                  −
                </button>
                <span className="font-medium">{item.quantity}</span>
                <button
                  onClick={() => handleAdd(item.productId)}
                  className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              <div className="mt-2 flex justify-between text-sm text-gray-700">
                <p>
                  <strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => dispatch(removeFromCart(item.productId))}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="bg-white border shadow-lg rounded-lg p-6 h-fit sticky top-24">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (7%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2 text-base">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPageClient;
