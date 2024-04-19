import axios from 'axios';

const API_URL = 'http://3.80.71.18:8080/api';

export default API_URL;

export const getAllProducts = () => {
  return axios.get(`${API_URL}/products`);
};


export const createProduct = (newProduct) => {
  return axios.post(`${API_URL}/products`, newProduct);
};


export const getProductById = (productId) => {
  return axios.get(`${API_URL}/products/${productId}`);
};


export const updateProduct = (productId, updatedProduct) => {
  return axios.put(`${API_URL}/products/${productId}`, updatedProduct);
};


export const deleteProduct = (productId) => {
  return axios.delete(`${API_URL}/products/${productId}`);
};