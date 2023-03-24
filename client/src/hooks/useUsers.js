import { useQuery } from "react-query";
import { getUsers } from "~/api/users/users";
import { queryKeys } from "~/react-query/queryKeys";

export const useUsers = () => useQuery([queryKeys.users], getUsers);
