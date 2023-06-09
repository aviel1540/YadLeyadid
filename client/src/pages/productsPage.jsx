import React from "react";
import { Products, TitleTab } from "~/components";

export const productsPage = () => {
	return (
		<>
			<TitleTab title="מוצרים" />
			<Products />
		</>
	)
};
