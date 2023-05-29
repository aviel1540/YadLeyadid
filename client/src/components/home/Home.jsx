import React, { useState } from "react";
import { useAuthStore } from "~/store/auth";
import { SquareInfo } from "./SquareInfo";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Notification } from "./Notification";
import { useProducts } from "~/hooks/useProducts";
import { Spinner } from "../ui/Spinner";
import { ProductPlace } from "~/constants/productPlace";
import { HiOutlineUsers } from "react-icons/hi";
import { useUsers } from "~/hooks/useUsers";
import { TbShoppingCartX } from "react-icons/tb"
import { Line, Pie } from "./chart";
import { Missions } from "./missions";

export const Home = () => {
	const [open, setOpen] = useState({
		action: false,
		popUp: false,
		modalDialog: false,
		title: "",
		content: "",
		id: "",
		info: {},
	});

	const { name } = useAuthStore();

	const { data: products, isLoading: isLoadingProducts } = useProducts();
	const { data: users, isLoading: isLoadingUsers } = useUsers();



	const availableProducts = products?.map((p) => p.place !== ProductPlace.LOANED).reduce((partialtotal, a) => partialtotal + a, 0);
	// const requestExtension = users?.map((u) => u?.userProductList?.map((p) => p?.requestDate))
	// console.log("🚀requestExtension:", requestExtension)


	if (isLoadingProducts || isLoadingUsers) return <Spinner />;


	return (
		<>
			<main className={`${open.action && "blur-sm"}`}>
				<div className="flex justify-center">
					<span className="text-2xl pt-12 underline">ברוך הבא - {name} 👋</span>
				</div>
				<section className="flex justify-center flex-row-reverse  gap-10 m-4 mt-16 sm:flex-wrap">
					<SquareInfo
						content={"סך מכירות"}
						total={"₪ 486,710"}
						icon={<AiOutlineShoppingCart />}
						style={"rgb(139, 172, 170,0.7)"}
					/>
					<SquareInfo
						content={"לקוחות"}
						total={users?.length}
						icon={<HiOutlineUsers />}
						style={"rgb(176, 71, 89,0.7)"}
					/>
					<SquareInfo
						content={"מוצרים מושאלים"}
						total={products?.length - availableProducts}
						icon={<TbShoppingCartX />}
						style={"rgb(231, 97, 97,0.7)"}
					/>
					<SquareInfo
						content={"מוצרים זמינים"}
						total={availableProducts}
						icon={<AiOutlineShoppingCart />}
						style={"rgb(249, 155, 125,0.7)"}
					/>
				</section>
			</main>
			<section className="grid justify-items-center grid-cols-2 gap-10 md:grid-cols-1 md:gap-5 md:p-3">
				<Pie users={users} blur={open.action} />
				<Missions setOpen={setOpen} open={open} />
				<Line blur={open.action} />
				<Notification blur={open.action} />
			</section>
		</>
	);
};
