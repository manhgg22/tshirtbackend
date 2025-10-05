import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (formData) =>
  API.post('/auth/register', formData);

export const login = (formData) =>
  API.post('/auth/login', formData);

export const getProducts = () => API.get('/products');
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (formData) =>
  API.post('/products', formData);

export const getMyDesigns = () => API.get('/designs/my-designs');
export const getPublicDesigns = () => API.get('/designs/public');
export const createDesign = (formData) =>
  API.post('/designs', formData);

export const createOrder = (orderData) => API.post('/orders', orderData);
export const getMyOrders = () => API.get('/orders/my-orders');
export const updateOrderStatus = (id, status) =>
  API.patch(`/orders/${id}/status`, { status });