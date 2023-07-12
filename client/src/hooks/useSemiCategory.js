import { useMutation, useQuery } from 'react-query';
import { queryKeys } from '~/react-query/queryKeys';
import * as semiCategory from '~/api/semiCategory';
import { onSuccess, onError } from '~/lib';

export const useSemiCategory = () => useQuery([queryKeys.semiCategory], semiCategory.getSemiCategory);

export const useAddSemiCategory = (setOpen, open, refetch) =>
  useMutation(semiCategory.addSemiCategory, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useUpdateSemiCategory = (setOpen, open, refetch) =>
  useMutation(semiCategory.updateSemiCategory, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useDeleteSemiCategory = (setOpen, open, refetch) =>
  useMutation((id) => semiCategory.deleteSemiCategory(id), {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });
