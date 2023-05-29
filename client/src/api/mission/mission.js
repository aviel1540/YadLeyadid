import axios from '../axios';

export const getMissions = async (username) => {
  const { data } = await axios.get(`/missions/${username}`);

  return data;
};

export const addMission = async (request) => {
  const { username } = request;
  const { data } = await axios.post(`/missions/add-mission/${username}`, request);

  return data;
};
