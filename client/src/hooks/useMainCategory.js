import { useMutation, useQuery } from 'react-query';
import { queryKeys } from '~/react-query/queryKeys';
import * as mainCategory from '~/api/mainCategory';
import { onSuccess, onError } from '~/lib';

export const useMainCategory = () => useQuery([queryKeys.mainCategory], mainCategory.getMainCategory);

export const useAddMainCategory = (setOpen, open, refetch) =>
  useMutation(mainCategory.addMainCategory, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useUpdateMainCategory = (setOpen, open, refetch) =>
  useMutation(mainCategory.updateMainCategory, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useDeleteMainCategory = (setOpen, open, refetch) =>
  useMutation((id) => mainCategory.deleteMainCategory(id), {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useAssignSemiCategoryToMainCategory = (setOpen, open, refetch) =>
  useMutation(mainCategory.assignSemiCategoryToMainCategory, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useUnassignSemiCategoryToMainCategory = (setOpen, open, refetch) =>
  useMutation((request) => mainCategory.unassignSemiCategoryToMainCategory(request), {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });
