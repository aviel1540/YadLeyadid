import { ToastContainer } from "react-toastify";
import { Routers } from "./Routers";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./react-query/queryClient";
import { SideBar } from "./components/sideBar/SideBar";
import { useEffect } from "react";
import { useAuthStore } from "./store/auth";
import { useLocation, useNavigate } from "react-router-dom";

function App() {
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
					theme="light"
				/>
				{hidde && <SideBar />}
				<Routers />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}

export default App;
