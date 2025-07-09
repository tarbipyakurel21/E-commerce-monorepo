import axiosInstance from '../api/axiosInstance'; 
import { API } from '../constants/api';

// Create a new order 
// Create a new order 
export const createOrder = async (orderData) => {
  try {
    const response = await axiosInstance.post(API.ORDERS.CREATE, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get all orders for the current user
export const getUserOrders = async () => {
  try {
    const response = await axiosInstance.get(API.ORDERS.USER_ORDERS);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

