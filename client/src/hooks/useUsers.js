import { useMutation, useQuery } from "react-query";
import * as users from "~/api/users";
import { queryKeys } from "~/react-query/queryKeys";
import { error } from "~/utils/onError";
import { success } from "~/utils/onSuccess";

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

export const useAddUser = (setOpen, open, refetch) =>
	useMutation(users.addUser, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateUser = (setOpen, open, refetch) =>
	useMutation(users.updateUser, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteUser = (setOpen, open, refetch) =>
	useMutation((id) => users.deleteUser(id), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useAsignProductToUser = (setOpen, open, refetch) =>
	useMutation(users.assignProductToUser, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
