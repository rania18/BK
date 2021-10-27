import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }
  return req;
});

//users
export const signIn = (formData) => API.post('/api/users/signin', formData);
export const signUp = (formData) => API.post('/api/users/signup', formData);
export const ListUsers = () => API.get('/api/users');
export const AddUser = (newUser) => API.post('/api/users/addUser', newUser);
export const EditUser = (id, newUser) => API.patch(`/api/users/${id}`, newUser);
export const DeleteUser = (id) => API.delete(`/api/users/${id}`);
export const getProfile = (id) => API.get(`/api/users/profile/${id}`);
export const editProfile = (id, formData) => API.patch(`/api/users/profile/${id}`, formData);

//products
export const fetchProducts = () => API.get(`/api/products`);
export const fetchProduct = (id) => API.get(`/api/products/${id}`);
export const createProduct = (newProduct) => API.post('/api/products/add', newProduct);
export const updateProduct = (id, updatedProduct) => API.patch(`/api/products/edit/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/api/products/${id}`);

//category
export const fetchCategories = () => API.get(`/api/categories`);
export const fetchCategory = (id) => API.get(`/api/categories/${id}`);
export const createCategory = (newCategory) => API.post('/api/categories/add', newCategory);
export const updateCategory = (id, updatedCategory) => API.patch(`/api/categories/edit/${id}`, updatedCategory);
export const deleteCategory = (id) => API.delete(`/api/categories/${id}`);

//project
export const fetchProjects = () => API.get(`/api/projects`);
export const fetchProject = (id) => API.get(`/api/projects/${id}`);
export const createProject = (newProject) => API.post('/api/projects/add', newProject);
export const updateProject = (id, updatedProject) => API.patch(`/api/projects/edit/${id}`, updatedProject);
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);

//blog
export const fetchBlogs = () => API.get(`/api/blogs`);
export const fetchBlog = (id) => API.get(`/api/blogs/${id}`);

//instagram
export const fetchInsatgrams = () => API.get(`/api/instagrams`);
export const fetchInstagram = (id) => API.get(`/api/instagrams/${id}`);

//shop
export const fetchShops = () => API.get(`/api/shop`);

//slider
export const fetchSliders = () => API.get(`/api/sliders`);