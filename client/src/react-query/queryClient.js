import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
	refetchOnMount: false,
	refetchOnReconnect: false,
	refetchOnWindowFocus: false,
});
