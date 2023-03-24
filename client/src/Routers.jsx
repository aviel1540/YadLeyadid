import React from "react";
import { Route, Routes } from "react-router-dom";
import * as Pages from "./pages/index";

export const Routers = () => {
	return (
		<Routes>
			<Route path="/" element={<Pages.HomePage />} exact />
			<Route path="/login" element={<Pages.Login />} exact />
			<Route path="/users" element={<Pages.UsersPage />} exact />
		</Routes>
	);
};
