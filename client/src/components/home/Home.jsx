import React, { useState } from "react";
import { useAuthStore } from "~/store/auth";
import { SquareInfo } from "./SquareInfo";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Notification } from "./Notification";
import { useProducts, useProductsPlaces } from "~/hooks/useProducts";
import { Spinner } from "../ui/Spinner";
import { ProductPlace } from "~/constants/productPlace";
import { HiOutlineUsers } from "react-icons/hi";
import { useUsers } from "~/hooks/useUsers";
import { TbShoppingCartX } from "react-icons/tb"
import { Columns, Line, Pie } from "./chart";
import { Missions } from "./missions";

export const Home = () => {
	const { name } = useAuthStore();

	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		content: "",
		id: "",
		info: {},
	});


	const { data: productsPlaces, isLoading: isLoadingProductsPlaces } = useProductsPlaces()
	const { data: products, isLoading: isLoadingProducts } = useProducts();
	const { data: users, isLoading: isLoadingUsers } = useUsers();


	if (isLoadingProducts || isLoadingUsers || isLoadingProductsPlaces) return <Spinner />;


	return (
		<>
			<main className={`${open.action && "blur-sm"}`}>
				<div className="flex justify-center">
					<span className="text-2xl pt-12 underline">ברוך הבא - {name} 👋</span>
				</div>
				<section className="flex justify-center flex-row-reverse  gap-10 m-4 mt-16 sm:flex-wrap">
					<SquareInfo
						animate={"animate-[wiggle_2s_ease-in-out_forwards]"}
						content={"לקוחות"}
						total={users?.length}
						icon={<HiOutlineUsers />}
						style={"rgb(139, 172, 170,0.7)"}
					/>
					<SquareInfo
						animate={"animate-[wiggleReverse_1s_ease-in-out_forwards]"}
						content={"מוצרים בתיקון"}
						total={productsPlaces?.repair}
						icon={<AiOutlineShoppingCart />}
						style={"rgb(176, 71, 89,0.7)"}
					/>

					<SquareInfo
						animate={"animate-[wiggleReverse_3s_ease-in-out_forwards]"}
						content={"מוצרים מושאלים"}
						total={productsPlaces?.loan}
						icon={<TbShoppingCartX />}
						style={"rgb(231, 97, 97,0.7)"}
					/>
					<SquareInfo
						animate={"animate-[wiggle_2s_ease-in-out_forwards]"}
						content={"מוצרים זמינים"}
						total={productsPlaces?.inStock}
						icon={<AiOutlineShoppingCart />}
						style={"rgb(249, 155, 125,0.7)"}
					/>
				</section>
			</main>
			<section className="grid justify-items-center grid-cols-2 gap-10 md:grid-cols-1 md:gap-5 md:p-3">
				<Pie products={products} blur={open.action} />
				<Missions setOpen={setOpen} open={open} />
				<Columns users={users} blur={open.action} />
				{/* <Line users={users} blur={open.action} /> */}
				<Notification blur={open.action} />
			</section>
		</>
	);
};
