import axios from '../axios';

export const getProducts = async () => {
  const { data } = await axios.get('/products');

  return data;
};

export const getProductsPlaces = async () => {
  const { data } = await axios.get('/products/product-place-counters');

  return data;
};

export const addProduct = async (productName) => {
  const { data } = await axios.post('/products/add-product', productName);

  return data;
};

export const updateProduct = async (request) => {
  const { id, productName } = request;

  const { data } = await axios.patch(`/products/update/${id}`, {
    productName,
  });

  return data;
};

export const deleteProduct = async (id) => {
  const { data } = await axios.delete(`/products/delete/${id}`);

  return data;
};

export const askExtensionRequest = async (request) => {
  const { id } = request;

  const { data } = await axios.post(`/products/ask-extension-request/${id}`, request);

  return data;
};
