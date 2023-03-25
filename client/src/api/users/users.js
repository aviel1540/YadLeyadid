import axios from "../axios";

export const getUsers = async () => {
	const { data } = await axios.get("/users");

	return data;
};

export const getUserByUsername = async (username) => {
	const { data } = await axios.get(`/users/find-by-username/${username}`);

	return data;
};
