import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import logo from "~/assets/images/logo.jpeg";
import { useLogin } from "~/hooks/useLogin";
import { error } from "~/utils/notification";

export const AuthForm = () => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const { mutate: login } = useLogin(reset);

	const onSubmit = (data) => {
		const { idTeuda, password } = data;

		try {
			const user = { idTeuda, password };
			login(user);
		} catch {
			error("משהו השתבש, נא לנסות שוב.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-1/4 block mt-44 ml-auto mr-auto xl:mt-10 xl:w-2/6 sm:w-11/12">
			<img src={logo} alt="logo" />
			<label htmlFor="idTeuda" className="block text-sm font-semibold mt-1">תעודת זהות:</label>
			<input type="text" id="idTeuda" className="block w-full px-4 py-2 mt-2 border rounded-md" placeholder="תעודת זהות" {...register("idTeuda", { required: { value: true, message: "שדה חובה." } })} />
			<p className="text-red text-sm">{errors.idTeuda?.message}</p>

			<label htmlFor="password" className="block text-sm font-semibold mt-3">סיסמא:</label>
			<input type="password" id="password" className="block w-full px-4 py-2 mt-2 border rounded-md" placeholder="סיסמא" {...register("password", { required: { value: true, message: "שדה חובה." } })} />
			<p className="text-red text-sm">{errors.password?.message}</p>

			<LoadingButton
				size="large"
				type="submit"
				variant="contained"
				className="!bg-orange !w-full !text-base !mt-6 !rounded-md"
			>
				התחבר
			</LoadingButton>
		</form>
	);
};