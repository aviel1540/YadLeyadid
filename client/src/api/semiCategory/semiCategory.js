import axios from '../axios';

export const getSemiCategory = async () => {
  const { data } = await axios.get('/semi-category');

  return data;
};

export const addSemiCategory = async (request) => {
  const { data } = await axios.post('/semi-category/add', request);

  return data;
};

export const updateSemiCategory = async (request) => {
  const { id, name, serialNumber } = request;

  const { data } = await axios.patch(`/semi-category/update/${id}`, {
    name,
    serialNumber,
  });

  return data;
};

export const deleteSemiCategory = async (id) => {
  const { data } = await axios.delete(`/semi-category/delete/${id}`);

  return data;
};
