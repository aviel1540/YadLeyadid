import axios from '../axios';

export const getUsers = async () => {
  const { data } = await axios.get('/users');

  return data;
};

export const getAdministrators = async () => {
  const { data } = await axios.get('/users/admins');

  return data;
};

export const addUser = async (user) => {
  const { data } = await axios.post('/users/register', user);

  return data;
};

export const getUserById = async (id) => {
  const { data } = await axios.get(`/users/${id}`);

  return data;
};

export const getUserByUsername = async (username) => {
  const { data } = await axios.get(`/users/find-by-username/${username}`);

  return data;
};

export const getProductsForUser = async (id) => {
  const { data } = await axios.get(`/users/user-list/${id}`);

  return data;
};

export const updateUser = async (user) => {
  const { data } = await axios.patch(`/users/update-details/${user.id}`, user);

  return data;
};

export const deleteUser = async (id) => {
  const { data } = await axios.delete(`/users/delete/${id}`);

  return data;
};

export const assignProductToUser = async (userId) => {
  const { data } = await axios.post(`/users/add-product/${userId}/asign-products`);

  return data;
};

export const unassignProductToUser = async (request) => {
  const { user_id, product_id } = request;
  const { data } = await axios.delete(`/users/delete-product/${user_id}/productId/${product_id}`);

  return data;
};
