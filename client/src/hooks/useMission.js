import { useMutation, useQuery } from 'react-query';
import { queryKeys } from '~/react-query/queryKeys';
import * as mission from '~/api/mission';
import { onSuccess } from '~/utils/onSuccess';
import { onError } from '~/utils/onError';

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