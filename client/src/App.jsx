import React from "react";
import { ToastContainer } from "react-toastify";
import { Routers } from "./Routers";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./react-query/queryClient";
import { SideBar } from "./components";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
import { useLocation, useNavigate } from "react-router-dom";

export const App = () => {
	const { isLoggedIn, isAdmin } = useAuthStore();

	const navigate = useNavigate();

	const location = useLocation();
	const hidde = isLoggedIn && isAdmin && location.pathname !== "/";

	useEffect(() => {
		if (isLoggedIn) return;
		navigate("/");
	}, [isLoggedIn]);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="colored"

				/>
				{hidde && <SideBar />}
				<Routers />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}
