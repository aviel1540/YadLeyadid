import { useMutation, useQuery } from 'react-query';
import { queryKeys } from '~/react-query/queryKeys';
import * as products from '~/api/products';
import { onSuccess, onError } from '~/lib';

export const useProducts = () => useQuery([queryKeys.products], products.getProducts);

export const useProductsPlaces = () => useQuery([queryKeys.productsPlaces], products.getProductsPlaces);

export const useAddProduct = (setOpen, open, refetch) =>
  useMutation(products.addProduct, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useUpdateProductLocation = (setOpen, open, refetch) =>
  useMutation(products.updateProductLocation, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useDeleteProduct = (setOpen, open, refetch) =>
  useMutation((id) => products.deleteProduct(id), {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useAskExtensionRequest = (setOpen, open, refetch) =>
  useMutation(products.askExtensionRequest, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useWaitConfirmExtensionRequest = () =>
  useQuery([queryKeys.waitConfirmExtensionRequest], products.waitConfirmExtensionRequest);

export const useExtensionRequestAnswer = (setOpen, open, refetch) =>
  useMutation(products.extensionRequestAnswer, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });
