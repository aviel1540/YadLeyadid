import React from "react";
import { useAuthStore } from "~/store/auth";

export const Home = () => {
	const { name } = useAuthStore();

	return (
		<div className="flex justify-center">
			<span className="text-xl pt-12">ברוך הבא {name} 👋</span>
		</div>
	);
};
