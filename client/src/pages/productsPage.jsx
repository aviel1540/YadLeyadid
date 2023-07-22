import { Products, TitleTab } from "~/components";

export const ProductsPage = () => {
	return (
		<>
			<TitleTab title="מוצרים" key='products' />
			<Products />
		</>
	)
};
