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

export const updateMission = async (request) => {
  const { missionId } = request;
  const { data } = await axios.patch(`/missions/update-mission/${missionId}`, request);

  return data;
};

export const deleteMission = async (missionId) => {
  const { data } = await axios.delete(`/missions/delete-mission/${missionId}`);

  return data;
};
