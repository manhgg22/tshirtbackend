import axios from 'axios';
import { API_BASE_URL, API_ENVIRONMENT } from '../config/api.js';

const API = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add environment info to headers for debugging
  config.headers['X-Environment'] = API_ENVIRONMENT;
  
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const register = (formData) =>
  API.post('/auth/register', formData);

export const login = (formData) =>
  API.post('/auth/login', formData);

export const getProducts = (params = {}) => API.get('/products', { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (formData) =>
  API.post('/products', formData);

// Categories
export const getCategories = () => API.get('/categories');
export const getCategory = (id) => API.get(`/categories/${id}`);

// Reviews
export const getReviews = (params = {}) => API.get('/reviews', { params });
export const createReview = (reviewData) => API.post('/reviews', reviewData);
export const updateReview = (id, reviewData) => API.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

// Vouchers
export const getVouchers = () => API.get('/vouchers');
export const validateVoucher = (code, data) => API.post(`/vouchers/${code}/validate`, data);

export const getMyDesigns = () => API.get('/designs/my-designs');
export const getPublicDesigns = () => API.get('/designs/public');
export const createDesign = (formData) =>
  API.post('/designs', formData);

export const createOrder = (orderData) => API.post('/orders/create', orderData);
export const getMyOrders = () => API.get('/orders/my-orders');
export const getAllOrders = () => API.get('/orders/all');
export const getOrderById = (id) => API.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) =>
  API.patch(`/orders/${id}/status`, { status });
export const markOrderAsPaid = (id) => API.patch(`/orders/${id}/mark-paid`);