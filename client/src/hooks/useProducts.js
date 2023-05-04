import { useMutation, useQuery } from "react-query";
import { queryKeys } from "~/react-query/queryKeys";
import * as products from "~/api/products";
import { success } from "~/utils/onSuccess";
import { error } from "~/utils/onError";

export const useProducts = () =>
	useQuery([queryKeys.products], products.getProducts);

export const useAddProduct = (setOpen, open, refetch) =>
	useMutation(products.addProduct, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useUpdateProduct = (setOpen, open, refetch) =>
	useMutation(products.updateProduct, {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});

export const useDeleteProduct = (setOpen, open, refetch) =>
	useMutation((id) => products.deleteProduct(id), {
		onSuccess: (data) => {
			success(data, setOpen, open, refetch);
		},
		onError: (data) => {
			error(data);
		},
	});
