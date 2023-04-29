import axios from "../axios";

export const getProducts = async () => {
	const { data } = await axios.get("/products");

	return data;
};

export const addProduct = async (productName) => {
	const { data } = await axios.post("/products/add-product", productName);

	return data;
};
