import axiosInstance from "./axiosInstance";
import { API } from "@/constants/api";

export const createPaymentIntent = async (orderId: number | string) => {
  try {
    const response = await axiosInstance.post<{ clientSecret: string }>(
      API.PAYMENTS.CREATE_INTENT,
      {
        orderId,
        currency: 'usd',
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};
