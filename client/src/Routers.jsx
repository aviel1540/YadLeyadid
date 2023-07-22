import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages/_index";
import { useAuthStore } from "./store/auth";

export const Routers = () => {
	const { isLoggedIn, isAdmin } = useAuthStore();

	return (
		<Routes>
			<Route path="/" element={<Pages.LoginPage />} exact />
			<Route path="*" element={<Pages.NotFoundPage />} exact />
			{isLoggedIn && isAdmin &&
				<>
					<Route path="/home" element={<Pages.HomePage />} exact />
					<Route path="/users" element={<Pages.UsersPage />} exact />
					<Route path="/products" element={<Pages.ProductsPage />} exact />
					<Route path="/semi-category" element={<Pages.SemiCategoryPage />} exact />
					<Route path="/main-category" element={<Pages.MainCategoryPage />} exact />
					<Route path="/administrator" element={<Pages.AdministratorPage />} exact />

				</>
			}
			{isLoggedIn &&
				<>
					<Route
						path="/details/:username"
						element={<Pages.UserDetailsPage />}
						exact
					/>
					<Route path="/user" element={<Pages.UserPage />} exact />
				</>
			}
		</Routes>
	);
};
