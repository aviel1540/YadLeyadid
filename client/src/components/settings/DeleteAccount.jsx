import React from "react";
import { InputText } from "../logic/InputText";
import { Button } from "@mui/material";

export const DeleteAccount = () => {
	return (
		<>
			<div className="flex justify-center mt-16">
				<span className="text-lg">מחיקת חשבון</span>
			</div>
			<div className="flex justify-center mt-10">
				<InputText
					originalText={"מחיקת חשבון"}
					className={"!ml-5 !mt-5 w-35"}
					// ref={codeInputRef}
				/>
				<Button
					size="large"
					type="submit"
					variant="contained"
					className="!bg-red !w-1/6 !text-base xl:!w-4/5 sm:!w-11/12"
					// onClick={submitHandler}
				>
					מחק חשבון
				</Button>
			</div>
		</>
	);
};
