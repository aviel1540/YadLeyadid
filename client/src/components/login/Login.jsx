import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import logo from "~/assets/images/logo.jpeg";
import { useLogin } from "~/hooks/useAuth";
import { useOpen } from "~/hooks/useOpen";
import { error } from "~/lib";
import { LoginValidator } from '~/lib/validators';
import { Button, Input } from "../logic";
import { PopUp } from "../ui";
import { ForgotPassword } from "./ForgotPassword";

export const Login = () => {
	const [showPassword, setShowPassword] = useState(false)

	const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: zodResolver(LoginValidator) });

	const [open, setOpen] = useOpen();

	const { mutate: login, isLoading } = useLogin(reset);

	const onSubmit = (data) => {
		const { entityCard, password } = data;

		try {
			const user = { entityCard, password };
			login(user);
		} catch (err) {
			error(err?.message);
		}
	};

	const changeModePassword = ()=>{
		setShowPassword((prev => !prev))
	}
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={`${open.action && "blur-sm"} w-1/4 block mt-44 ml-auto mr-auto xl:mt-10 xl:w-2/6 sm:w-11/12`}>
				<img src={logo} alt="logo" className="not-drag" />

				<label htmlFor="entityCard" className="block text-sm font-semibold mt-1">תעודת זהות:</label>
				<Input type="text" id="entityCard" className='w-full' placeholder="תעודת זהות" {...register("entityCard", { required: { value: true, message: "שדה חובה." } })} />
				<p className="text-red text-sm">{errors.entityCard?.message}</p>

				<label htmlFor="password" className="block text-sm font-semibold mt-3">סיסמא: </label>

				<div className='float-left'>
					{showPassword ? <VscEye size={20} className='icon-show_password' onClick={changeModePassword} /> :
						<VscEyeClosed size={20} className='icon-show_password' onClick={changeModePassword} />}
				</div>

				<Input type={`${showPassword ? "text" : "password"}`} id="password" className='w-full' placeholder="סיסמא" {...register("password", { required: { value: true, message: "שדה חובה." } })} />
				<p className="text-red text-sm">{errors.password?.message}</p>

				<div className="flex justify-end mt-2 mr-0.5">
					<span className="font-semibold cursor-pointer hover:tracking-wide"
						onClick={() =>
							setOpen({
								...open,
								popUp: true,
								action: true,
								title: "fogotPassword",
								content: "שכחתי סיסמא"
							})
						}>
						שכחתי סיסמא?
					</span>
				</div>

				<Button
					className={`${isLoading ? "bg-orange/60" : "bg-orange"} text-white h-9 w-full text-base mt-6 rounded-md hover:shadow hover:shadow-black/50 `}
					isLoading={isLoading}
					disabled={isLoading}
				>
					התחבר
				</Button>
			</form>

			{open.action && (
				<PopUp setOpen={setOpen} open={open}>
					<ForgotPassword
						open={open}
						setOpen={setOpen}
					/>
				</PopUp>)
			}
		</>
	);
};