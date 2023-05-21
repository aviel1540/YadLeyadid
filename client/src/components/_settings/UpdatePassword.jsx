import React from "react";
import { TextInput } from "../logic/TextInput";
import { Button } from "@mui/material";

export const UpdatePassword = () => {
	return (
		<>
			<TextInput
				originalText={"סיסמא נוכחית"}
				placeholder={"סיסמא נוכחית"}
				className={"!ml-5 !mt-5 w-35"}
				password={true}
			// ref={codeInputRef}
			/>
			<TextInput
				originalText={"סיסמא חדשה"}
				placeholder={"סיסמא חדשה"}
				className={"!ml-5 !mt-5 w-35"}
				password={true}
			// ref={codeInputRef}
			/>

			<TextInput
				originalText={"אימות סיסמא"}
				placeholder={"אימות סיסמא"}
				className={"!ml-5 !mt-5 w-35"}
				password={true}
			// ref={codeInputRef}
			/>
			<div className="flex justify-center mt-10">
				<Button
					size="large"
					type="submit"
					variant="contained"
					className="!bg-green !w-2/6 !text-base sm:!w-4/6"
				// onClick={submitHandler}
				>
					עדכן
				</Button>
			</div>
		</>
	);
};
