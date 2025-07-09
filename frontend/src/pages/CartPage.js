import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCart as apiGetCart } from '../api/cart';
import { setCartItems } from '../redux/cartSlice';
import { toast } from 'react-toastify';
import useCartActions from '../hooks/useCartActions';
import { createOrder } from '../api/orders';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleAddToCart,
    handleRemoveFromCart,
    handleSubtractFromCart,
  } = useCartActions();

  useEffect(() => {
    apiGetCart()
      .then((res) => dispatch(setCartItems(res.data.items)))
      .catch((err) => {
        console.error("Failed to load cart", err);
        toast.error("Could not load cart.");
        if (err.response?.status === 401) window.location.href = "/login";
      });
  }, [dispatch]);

  const handleCheckout = async () => {
    try {
      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
  
      // Create order with correct payload structure
      const order = await createOrder({ items: orderItems });
  
      navigate(`/payment/${order.orderId}`); // Go to payment page with orderId
    } catch (err) {
      console.error("Checkout failed", err);
      toast.error("Could not proceed to payment.");
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return <p className="text-center mt-5">Your cart is empty.</p>;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.07;
  const total = subtotal + tax;

  return (
    <div className="container py-4">
      <div className="row">
        {/* Cart Items */}
        <div className="col-md-8">
          <h4 className="mb-3">Shopping Cart</h4>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="d-flex mb-4 p-3 border rounded shadow-sm bg-white align-items-center"
            >
              <div className="flex-grow-1">
                <h6>{item.productName}</h6>
                <p className="mb-1 text-muted">${item.price.toFixed(2)} each</p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => handleSubtractFromCart({ ...item, id: item.productId })}>-</button>
                  <span>{item.quantity}</span>
                  <button className="btn btn-sm btn-outline-secondary ms-2" onClick={() => handleAddToCart({ ...item, id: item.productId })}>+</button>
                </div>
                <p className="mt-2"><strong>Total:</strong> ${(item.price * item.quantity).toFixed(2)}</p>
                <button
                  className="btn btn-sm btn-link text-danger p-0"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="col-md-4">
          <div className="p-4 border rounded shadow-sm bg-white sticky-top" style={{ top: '100px' }}>
            <h5>Order Summary</h5>
            <hr />
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Tax (7%): ${tax.toFixed(2)}</p>
            <p className="fw-bold">Total: ${total.toFixed(2)}</p>
            <button className="btn btn-success w-100 mt-3" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
