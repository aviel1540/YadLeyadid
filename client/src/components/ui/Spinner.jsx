import React from "react";
import { MoonLoader } from "react-spinners";
import { cn } from "~/lib";

export const Spinner = ({ className }) => {
	return (
		<div className='flex justify-center items-center mt-32'>
			<MoonLoader color="#000000" className={cn(className)} />
		</div>
	);
};
