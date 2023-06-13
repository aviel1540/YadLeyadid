import axios from '../axios';

export const getMainCategory = async () => {
  const { data } = await axios.get('/main-category');

  return data;
};
