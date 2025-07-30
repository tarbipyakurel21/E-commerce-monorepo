// src/constants/api.ts

export const API = {
  // auth-service APIs
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    OAUTH_SUCCESS: '/auth/oauth2/success',
  },

  // product-service
  PRODUCTS: {
    ALL: '/api/products',
    SINGLE: (id: number) => `/api/products/${id}`,
    CREATE: '/api/products',
    UPDATE: (id: number) => `/api/products/${id}`,
    DELETE: (id: number) => `/api/products/${id}`,
    SEARCH: (name: string) => `/api/products/search?name=${name}`,
    FILTER: '/api/products/filter',
  },

  // cart-service
  CART: {
    GET: '/api/cart',
    ADD: '/api/cart/add',
    REMOVE: (id: number) => `/api/cart/remove/${id}`,
    CLEAR:'/api/cart/clear',
  },

  // order-service
  ORDERS: {
    CREATE: '/api/orders',
    USER_ORDERS: '/api/orders',
    SINGLE: (id: string | number) => `/api/orders/${id}`,
    GET_TOTAL:(orderId:number)=>`/api/orders/${orderId}/total`,
  },

  // payment-service
  PAYMENTS: {
    CREATE_INTENT: '/api/payments/create-intent',
  },
};
