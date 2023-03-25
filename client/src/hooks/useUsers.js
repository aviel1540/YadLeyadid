import { useQuery } from "react-query";
import { getProductsForUser, getUserByUsername, getUsers } from "~/api/users/users";
import { queryKeys } from "~/react-query/queryKeys";

export const useUsers = () => useQuery([queryKeys.users], getUsers);

export const useUserByUsername = (username) =>
	useQuery([queryKeys.userByUsername], () => getUserByUsername(username), {
		enabled: !!username,
	});

export const useProductsForUser = (id) =>
	useQuery([queryKeys.productsForUser], () => getProductsForUser(id), {
		enabled: !!id,
});
