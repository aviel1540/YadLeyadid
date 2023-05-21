import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "~/api/login/login";
import { useAuthStore } from "~/store/auth";
import { error } from "~/utils/onError";
import { decodeToken } from "react-jwt";

export const useLogin = () => {
	const navigate = useNavigate();
	const { loginStore } = useAuthStore();

	return useMutation(login, {
		onSuccess: (data) => {
			const isAdmin = decodeToken(data)?.isAdmin;
			loginStore(data);
			if (isAdmin) navigate("/");
			else navigate("/client");
		},
		onError: (data) => {
			error(data);
		},
	});
};
