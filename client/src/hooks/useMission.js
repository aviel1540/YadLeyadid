import { useMutation, useQuery } from 'react-query';
import { queryKeys } from '~/react-query/queryKeys';
import * as mission from '~/api/mission';
import { onSuccess, onError } from '~/lib';

export const useMissions = (username) => useQuery([queryKeys.missions], () => mission.getMissions(username));

export const useAddMission = (setOpen, open, refetch) =>
  useMutation(mission.addMission, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useUpdateMission = (setOpen, open, refetch) =>
  useMutation(mission.updateMission, {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });

export const useDeleteMission = (setOpen, open, refetch) =>
  useMutation((id) => mission.deleteMission(id), {
    onSuccess: (data) => {
      onSuccess(data, setOpen, open, refetch);
    },
    onError: (data) => {
      onError(data);
    },
  });
