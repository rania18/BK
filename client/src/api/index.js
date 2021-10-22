import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

//users
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);
export const ListUsers = () => API.get(`/user/listUsers/`);
export const AddUser = (newUser) => API.post(`/user/addUser/`, newUser);
export const EditUser = (id, newUser) => API.patch(`/user/${id}`, newUser);
export const DeleteUser = (id) => API.delete(`/user/${id}`);
export const getProfile = (id) => API.get(`/user/profile/${id}`);
export const editProfile = (id, formData) => API.patch(`/user/profile/${id}`, formData);

//products
export const fetchProducts = () => API.get(`/products`);
export const fetchProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (newProduct) => API.post('/products/add', newProduct);
export const updateProduct = (id, updatedProduct) => API.patch(`/products/edit/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
