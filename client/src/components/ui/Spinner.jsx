import React from "react";
import { ClockLoader } from "react-spinners";
import { cn } from "~/lib";

export const Spinner = ({ className, size }) => {
	return (
		<div className={cn('flex justify-center items-center ', className)}>
			<ClockLoader speedMultiplier={2} color="#ff7849" className="!shadow-lg !shadow-gray" size={size ?? 80} />
		</div>
	);
};
