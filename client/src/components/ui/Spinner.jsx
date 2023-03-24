import React from "react";
import { MoonLoader } from "react-spinners";

export const Spinner = () => {
	return (
		<div className="flex justify-center items-center mt-32">
			<MoonLoader color="#000000" />
		</div>
	);
};
