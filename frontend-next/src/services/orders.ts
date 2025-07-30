import axiosInstance from '@/services/axiosInstance'; 
import { API } from '@/constants/api';

// Create a new order
export const createOrder = async (orderData:CreateOrderRequest): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post<OrderResponse>(API.ORDERS.CREATE, orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get all orders for the currently authenticated user
export const getUserOrders = async (): Promise<OrderResponse[]> => {
  try {
    const response = await axiosInstance.get<OrderResponse[]>(API.ORDERS.USER_ORDERS);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Get a single order by ID
export const getOrderById = async (orderId: number | string): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.get<OrderResponse>(API.ORDERS.SINGLE(orderId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

// Get total price of a specific order
export const getOrderTotal = async (orderId: number): Promise<number> => {
  try {
    const response = await axiosInstance.get<number>(API.ORDERS.GET_TOTAL(orderId));
    return response.data;
  } catch (error) {
    console.error(`Error fetching total for order ${orderId}:`, error);
    throw error;
  }
};


export interface OrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  items: OrderItemRequest[];
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface OrderResponse {
  orderId: number;
  subtotal: number;
  tax:number;
  totalAmount:number;
  status: string;
  createdAt: string; // You can convert to Date if needed using new Date(createdAt)
  items: OrderItemResponse[];
}
