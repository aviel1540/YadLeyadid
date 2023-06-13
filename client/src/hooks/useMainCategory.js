import { useMutation, useQuery } from 'react-query';
import { queryKeys } from '~/react-query/queryKeys';
import * as mainCategory from '~/api/mainCategory';
import { onSuccess, onError } from '~/utils';

export const useMainCategory = () => useQuery([queryKeys.mainCategory], mainCategory.getMainCategory);
