// This points to the api gateway 
const BASE_URL = process.env.REACT_APP_URL;

// all api endpoints on the backend with diff microservices
export const API = {
  //auth-service apis
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/auth/register`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH: `${BASE_URL}/auth/refresh`,
    OAUTH_SUCCESS: `${BASE_URL}/auth/oauth2/success`
  },
  //product-service
  PRODUCTS: {
    //search by products or category category is optional in all.
    ALL: `${BASE_URL}/api/products`,
    SINGLE: (id) => `${BASE_URL}/api/products/${id}`,
    CREATE: `${BASE_URL}/api/products`,
    UPDATE: (id) => `${BASE_URL}/api/products/${id}`,
    DELETE: (id) => `${BASE_URL}/api/products/${id}`,
    SEARCH: (name) => `${BASE_URL}/api/products/search?name=${name}`,
    FILTER: `${BASE_URL}/api/products/filter`
  },
  //cart-service
  CART: {
    GET: `${BASE_URL}/api/cart`,
    ADD: `${BASE_URL}/api/cart/add`,
    REMOVE: (id) => `${BASE_URL}/api/cart/remove/${id}`
  },
  //order-service
  ORDERS: {
    CREATE: `${BASE_URL}/api/orders`,
    USER_ORDERS: `${BASE_URL}/api/orders` // GET request with "X-UserId" in headers
  },
//payment-service
  PAYMENTS: {
    CREATE_INTENT: `${BASE_URL}/api/payments/create-intent`, 
  }
};
