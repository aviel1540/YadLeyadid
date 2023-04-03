import axios from "../axios";

export const getUsers = async () => {
	const { data } = await axios.get("/users");

	return data;
};

export const getUserById = async (id) => {
	const { data } = await axios.get(`/users/${id}`);

	return data;
};

export const getUserByUsername = async (username) => {
	const { data } = await axios.get(`/users/find-by-username/${username}`);

	return data;
};

export const getProductsForUser = async (id) => {
	const { data } = await axios.get(`/users/user-list/${id}`);

	return data;
};
