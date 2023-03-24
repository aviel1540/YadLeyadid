import { ToastContainer } from "react-toastify";
import { Routers } from "./Routers";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { queryClient } from "./react-query/queryClient";
import { SideBar } from "./components/sideBar/SideBar";

function App() {
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
				<SideBar />
				<Routers />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}

export default App;
