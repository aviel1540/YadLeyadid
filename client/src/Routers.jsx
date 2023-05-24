import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages";
import { useAuthStore } from "./store/auth";

export const Routers = () => {
	const { isLoggedIn, isAdmin } = useAuthStore();

	return (
		<Routes>
			<Route path="/" element={<Pages.LoginPage />} exact />
			<Route path="*" element={<Pages.NotFoundPage />} exact />
			{isAdmin &&
				<>
					<Route path="/home" element={<Pages.HomePage />} exact />
					<Route path="/settings" element={<Pages.InformationPage />} exact />
					<Route path="/users" element={<Pages.UsersPage />} exact />
					<Route path="/products" element={<Pages.productsPage />} exact />

				</>
			}
			{isLoggedIn &&
				<>
					<Route
						path="/details/:username"
						element={<Pages.UserDetailsPage />}
						exact
					/>
					<Route path="/client" element={<Pages.ClientPage />} exact />
				</>
			}
		</Routes>
	);
};
