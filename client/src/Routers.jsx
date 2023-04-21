import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages/index";

export const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Pages.HomePage />} exact />
			<Route path="/settings" element={<Pages.InformationPage />} exact />
			<Route path="/login" element={<Pages.LoginPage />} exact />
			<Route path="/users" element={<Pages.UsersPage />} exact />
			<Route path="/products" element={<Pages.productsPage />} exact />
			<Route
				path="users/details/:username"
				element={<Pages.UserDetailsPage />}
				exact
			/>
		</Routes>
	);
};
