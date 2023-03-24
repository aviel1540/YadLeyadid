import axios from "../axios";

export const login = async (user) => {
	const { data } = await axios.post("/users/login", user);

	return data;
};
