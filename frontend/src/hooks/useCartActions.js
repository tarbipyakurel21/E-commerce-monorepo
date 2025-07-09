import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart as addToCartRedux,
  removeFromCart as removeFromCartRedux,
  subtractFromCart as subtractFromCartRedux,
} from '../redux/cartSlice';

import {
  addToCart as apiAddToCart,
  removeFromCart as apiRemoveFromCart,
} from '../api/cart';

import { toast } from 'react-toastify';

const useCartActions = () => {
  const dispatch = useDispatch();
  const cartItems=useSelector((state)=>state.cart.items);
  
  const handleAddToCart = async (product) => {
    try {
      await apiAddToCart(product.id, 1);
      dispatch(addToCartRedux({ ...product, quantity: 1 }));
      toast.success("Added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      if (err.response?.status === 401) {
        toast.error("Please login to add to cart");
        window.location.href = '/login';
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await apiRemoveFromCart(productId);
      dispatch(removeFromCartRedux(productId));
      toast.info("Item removed from cart.");
    } catch (err) {
      console.error("Remove from cart failed", err);
      toast.error("Failed to remove item.");
    }
  };

  const handleSubtractFromCart = async (product) => {
    try {
      const item = cartItems.find((i) => i.productId === product.id || i.id === product.id);
      if (!item) return;

      if (item.quantity <= 1) {
        await apiRemoveFromCart(product.id);
        dispatch(removeFromCartRedux(product.id));
        toast.info("Item removed from cart.");
      } else {
        await apiAddToCart(product.id, -1);
        dispatch(subtractFromCartRedux(product.id));
        toast.info("Item quantity reduced.");
      }
    } catch (err) {
      console.error("Subtract from cart failed", err);
      toast.error("Failed to reduce quantity.");
    }
  };

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleSubtractFromCart,
  };
};

export default useCartActions;
