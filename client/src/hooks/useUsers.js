import { useQuery } from "react-query";
import * as users from "~/api/users";
import { queryKeys } from "~/react-query/queryKeys";

export const useUsers = () => useQuery([queryKeys.users], users.getUsers);

export const useUserById = (id) =>
	useQuery([queryKeys.userById], () => users.getUserById(id), {
		enabled: !!id,
	});

export const useUserByUsername = (username) =>
	useQuery(
		[queryKeys.userByUsername],
		() => users.getUserByUsername(username),
		{
			enabled: !!username,
			refetchOnWindowFocus: false,
		}
	);

export const useProductsForUser = (id) =>
	useQuery([queryKeys.productsForUser], () => users.getProductsForUser(id), {
		enabled: !!id,
	});
