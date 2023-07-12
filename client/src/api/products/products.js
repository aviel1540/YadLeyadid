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

export const updateProductLocation = async (request) => {
  const { id, productPlace } = request;

  const { data } = await axios.patch(`/products/update-location/${id}`, {
    productPlace,
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

export const waitConfirmExtensionRequest = async () => {
  const { data } = await axios.get('/products/wait-confirm-extension-request');

  return data;
};

export const extensionRequestAnswer = async (request) => {
  const { id } = request;

  const { data } = await axios.post(`/products/extension-request-answer/${id}`, request);

  return data;
};
