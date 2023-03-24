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
		<>
			<Stack
				spacing={2}
				className="w-1/5 block mt-52 ml-auto mr-auto xl:w-2/5 sm:w-11/12"
			>
				<TextField
					name="id"
					placeholder="תעודת זהות"
					variant="outlined"
					inputRef={idInputRef}
					required
					InputLabelProps={{
						style: {
							left: "inherit",
							right: "1.75rem",
							transformOrigin: "right",
						},
					}}
				/>
				<TextField
					name="password"
					placeholder="סיסמא"
					type={showPassword ? "text" : "password"}
					inputRef={passwordInputRef}
					required
					variant="outlined"
					InputLabelProps={{
						style: { left: "inherit", right: "1.75rem" },
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() =>
										setShowPassword(!showPassword)
									}
									edge="end"
								>
									{showPassword ? (
										<AiFillEye />
									) : (
										<AiFillEyeInvisible />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Stack direction="row" alignItems="center" sx={{ my: 2 }}>
					<Checkbox
						name="iAgree"
						checked={iAgree}
						onClick={() => setIAgree(!iAgree)}
					/>
					אני מאשר/ת תנאי שימוש.
				</Stack>
			</Stack>

			<Stack className="flex flex-col items-center w-full text-base mt-2">
				<LoadingButton
					size="large"
					type="submit"
					variant="contained"
					onClick={handleSubmit}
					className="!w-1/5 xl:!w-2/5 sm:!w-11/12 "
				>
					התחבר
				</LoadingButton>
			</Stack>
		</>
	);
};
