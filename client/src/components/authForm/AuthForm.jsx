import { useForm } from "react-hook-form";
import logo from "~/assets/images/logo.jpeg";
import { useLogin } from "~/hooks/useLogin";
import { error } from "~/utils/notification";
import { Button } from "../logic";

export const AuthForm = () => {
	const { register, handleSubmit, reset, formState: { errors } } = useForm();

	const { mutate: login } = useLogin(reset);

	const onSubmit = (data) => {
		const { entityCard, password } = data;

		try {
			const user = { entityCard, password };
			login(user);
		} catch {
			error("משהו השתבש, נא לנסות שוב.");
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-1/4 block mt-44 ml-auto mr-auto xl:mt-10 xl:w-2/6 sm:w-11/12">
			<img src={logo} alt="logo" className="not-drag" />
			<label htmlFor="entityCard" className="block text-sm font-semibold mt-1">תעודת זהות:</label>
			<input type="text" id="entityCard" className="block w-full px-4 py-2 mt-2 border rounded-md" placeholder="תעודת זהות" {...register("entityCard", { required: { value: true, message: "שדה חובה." } })} />
			<p className="text-red text-sm">{errors.entityCard?.message}</p>

			<label htmlFor="password" className="block text-sm font-semibold mt-3">סיסמא:</label>
			<input type="password" id="password" className="block w-full px-4 py-2 mt-2 border rounded-md" placeholder="סיסמא" {...register("password", { required: { value: true, message: "שדה חובה." } })} />
			<p className="text-red text-sm">{errors.password?.message}</p>

			<div className="flex justify-end mt-2 mr-0.5">
				<span className="font-semibold cursor-pointer hover:tracking-wide">שכחתי סיסמא?</span>
			</div>

			<Button className="bg-orange text-white h-9 w-full text-base mt-6 rounded-md hover:shadow hover:shadow-black/50" title="התחבר" />
		</form>
	);
};