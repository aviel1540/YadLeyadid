import axios from '../axios';

export const getMainCategory = async () => {
  const { data } = await axios.get('/main-category');

  return data;
};

export const addMainCategory = async (mainCategoryName) => {
  const { data } = await axios.post('/main-category/add', mainCategoryName);

  return data;
};

export const updateMainCategory = async (request) => {
  const { id, mainCategoryName } = request;

  const { data } = await axios.patch(`/main-category/update/${id}`, {
    mainCategoryName,
  });

  return data;
};

export const deleteMainCategory = async (id) => {
  const { data } = await axios.delete(`/main-category/delete/${id}`);

  return data;
};

export const assignSemiCategoryToMainCategory = async (request) => {
  const { id } = request;
  const { data } = await axios.post(`/main-category/${id}/asign-semi-category`, request);

  return data;
};

export const unassignSemiCategoryToMainCategory = async (request) => {
  const { id, semi_id } = request;
  const { data } = await axios.delete(`/main-category/${id}/unasign-category/${semi_id}`);

  return data;
};
