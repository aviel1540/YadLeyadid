import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { login } from "~/api/login/login";
import { useAuthStore } from "~/store/auth";
import { error } from "~/utils/onError";

export const useLogin = () => {
	const navigate = useNavigate();
	const { loginStore } = useAuthStore();

	return useMutation(login, {
		onSuccess: (data) => {
			loginStore(data);
			navigate("/");
		},
		onError: (data) => {
			error(data);
		},
	});
};
