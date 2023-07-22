import React from "react";
import { SyncLoader } from "react-spinners";
import { cn } from "~/lib";

export const Spinner = ({ className }) => {
	return (
		<div className={cn('flex justify-center items-center ', className)}>
			<SyncLoader  color="#ff7849"  size={20} />
		</div>
	);
};
