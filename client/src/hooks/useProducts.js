import { useQuery } from "react-query";
import { queryKeys } from "~/react-query/queryKeys";
import * as products from "~/api/products";

export const useProducts = () =>
	useQuery([queryKeys.products], products.getProducts);
