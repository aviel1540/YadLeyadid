import { LoadingButton } from "@mui/lab";
import {
	Checkbox,
	Stack
} from "@mui/material";
import { useRef, useState } from "react";
import logo from "~/assets/images/logo.jpeg";
import { useLogin } from "~/hooks/useLogin";
import * as toastMessage from "~/utils/notification/index";
import { TextInput } from "../logic/TextInput";

export const AuthForm = () => {
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
			toastMessage.error("משהו השתבש, נא לנסות שוב.");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack
				spacing={2}
				className="w-1/5 block mt-44 ml-auto mr-auto xl:w-2/5 sm:w-11/12"
			>
				<img src={logo} alt="logo" />
				<TextInput
					originalText={"תעודת זהות"}
					placeholder={"תעודת זהות"}
					className={"!mt-5 w-35"}
					ref={idInputRef}
				/>

				<TextInput
					originalText={"סיסמא"}
					placeholder={"סיסמא"}
					className={"!mt-5 w-35 "}
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
