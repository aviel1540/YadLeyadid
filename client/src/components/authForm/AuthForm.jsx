import { LoadingButton } from "@mui/lab";
import {
	Checkbox,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useLogin } from "~/hooks/useLogin";
import * as toastMessage from "~/utils/notification/index";
import { InputText } from "../logic/InputText";
import logo from "~/assets/images/logo.jpeg";

export const AuthForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [iAgree, setIAgree] = useState(true);

	const idInputRef = useRef();
	const passwordInputRef = useRef();

	const { mutate: login } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();

		const idTeuda = idInputRef?.current?.value;
		const password = passwordInputRef?.current?.value;

		try {
			if (!idTeuda || !password)
				toastMessage.info("נא למלא את כל השדות.");
			else {
				if (!iAgree) {
					toastMessage.info("נא לאשר תנאי שימוש.");
				} else {
					const user = { idTeuda, password };
					login(user);
				}
			}
		} catch {
			toastMessage.error("שגיאה: בעיית התחברות לשרת.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack
				spacing={2}
				className="w-1/5 block mt-44 ml-auto mr-auto xl:w-2/5 sm:w-11/12"
			>
				<img src={logo} alt="logo" />
				<InputText
					originalText={"תעודת זהות"}
					placeholder={"תעודת זהות"}
					className={"!ml-5 !mt-5 w-35"}
					ref={idInputRef}
				/>

				<InputText
					originalText={"סיסמא"}
					placeholder={"סיסמא"}
					className={"!ml-5 !mt-5 w-35"}
					password={true}
					ref={passwordInputRef}
				/>

				<Stack direction="row" alignItems="center" sx={{ my: 2 }}>
					<Checkbox
						name="iAgree"
						checked={iAgree}
						onClick={() => setIAgree(!iAgree)}
						color="secondary"
					/>
					אני מאשר/ת תנאי שימוש.
				</Stack>
			</Stack>

			<Stack className="flex flex-col items-center w-full text-base mt-2">
				<LoadingButton
					size="large"
					type="submit"
					variant="contained"
					className="!bg-orange !w-1/5 xl:!w-2/5 sm:!w-11/12"
				>
					התחבר
				</LoadingButton>
			</Stack>
		</form>
	);
};
