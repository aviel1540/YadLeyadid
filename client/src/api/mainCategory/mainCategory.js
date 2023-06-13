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
