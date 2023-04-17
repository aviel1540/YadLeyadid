import { create } from "zustand";
import { tokenCookies } from "~/services/cookiesService";
import { decodeToken } from "react-jwt";

export const mainStore = (set) => {
	const token = tokenCookies.get();
	const decodedToken = decodeToken(token);

	const loginStore = (currentToken) => {
		const decodedToken = decodeToken(currentToken);
		tokenCookies.set(currentToken);

		set({
			isLoggedIn: true,
			token: currentToken,
			isAdmin: decodedToken?.isAdmin,
			name: decodedToken?.name,
			username: decodedToken?.username,
		});
	};

	const logoutStore = () => {
		tokenCookies.remove();

		set({
			isLoggedIn: false,
			token: undefined,
		});
	};

	return {
		token,
		isLoggedIn: !!token,
		isAdmin: decodedToken?.isAdmin,
		name: decodedToken?.name,
		username: decodedToken?.username,
		loginStore,
		logoutStore,
	};
};

export const useAuthStore = create(mainStore);
