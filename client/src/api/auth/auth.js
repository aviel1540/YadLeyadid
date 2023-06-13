import axios from '../axios';

export const login = async (user) => {
  const { data } = await axios.post('/users/login', user);

  return data;
};

export const forgotPassword = async (email) => {
  const { data } = await axios.post(`/users/forgot-password`, email);

  return data;
};

export const verificationCode = async (code) => {
  const { data } = await axios.post(`/users/verification-code`, code);

  return data;
};

export const changePassword = async (request) => {
  const { data } = await axios.post(`/users/change-password`, request);

  return data;
};
