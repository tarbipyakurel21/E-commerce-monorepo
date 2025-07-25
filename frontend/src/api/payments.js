import axiosInstance from '../api/axiosInstance';
import { API } from '../constants/api'; 
 

// Make a payment
export const createPaymentIntent = async (orderId, currency = 'usd') => {
  const response = await axiosInstance.post(API.PAYMENTS.CREATE_INTENT, { orderId, currency });
  return response.data.clientSecret;
};
