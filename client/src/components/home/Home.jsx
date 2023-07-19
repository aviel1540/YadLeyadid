import { useState } from "react";
import { BsCartCheck, BsCartX } from "react-icons/bs";
import { HiOutlineUsers } from "react-icons/hi";
import { TbShoppingCartOff } from "react-icons/tb";
import { useProducts, useProductsPlaces } from "~/hooks/useProducts";
import { useAdministrators, useUsers } from "~/hooks/useUsers";
import { useAuthStore } from "~/store/auth";
import { Spinner } from "../ui";
import { SquareInfo, Missions, Notification } from ".";
import { Columns, Line, Pie } from "./charts";
import { useMainCategory } from "~/hooks/useMainCategory";
import { useSemiCategory } from "~/hooks/useSemiCategory";
import { useOpen } from "~/hooks/useOpen";

export const Home = () => {
	const { name } = useAuthStore();

	const [open, setOpen] = useOpen();

	// To save all the data in the cache to prevent unnecessary loadings.
	useMainCategory();
	useProducts();
	useSemiCategory();
	useAdministrators();

	const { data: productsPlaces, isLoading: isLoadingProductsPlaces } = useProductsPlaces()
	const { data: users, isLoading: isLoadingUsers } = useUsers();

	if (isLoadingUsers || isLoadingProductsPlaces) return <Spinner className='mt-32' size={150} />;

	return (
		<>
			<main className={`${open.action && "blur-sm"}`}>
				<div className="flex justify-center">
					<h1 className="text-2xl pt-12 underline">שלום {name} 👋</h1>
				</div>
				<section className="flex justify-center flex-row-reverse  gap-10 m-4 mt-16 sm:flex-wrap">
					<SquareInfo
						className={"animate-[wiggle_2s_ease-in-out_forwards] hover:shadow hover:shadow-black/50"}
						content={"לקוחות"}
						total={users?.length}
						icon={<HiOutlineUsers />}
						style={"rgb(139, 172, 170,0.7)"}
					/>
					<SquareInfo
						className={"animate-[wiggleReverse_1s_ease-in-out_forwards] hover:shadow hover:shadow-black/50"}
						content={"מוצרים בתיקון"}
						total={productsPlaces?.repair}
						icon={<BsCartX />}
						style={"rgb(176, 71, 89,0.7)"}
					/>

					<SquareInfo
						className={"animate-[wiggleReverse_3s_ease-in-out_forwards] hover:shadow hover:shadow-black/50"}
						content={"מוצרים מושאלים"}
						total={productsPlaces?.loaned}
						icon={<TbShoppingCartOff />}
						style={"rgb(231, 97, 97,0.7)"}
					/>
					<SquareInfo
						className={"animate-[wiggle_2s_ease-in-out_forwards] hover:shadow hover:shadow-black/50"}
						content={"מוצרים זמינים"}
						total={productsPlaces?.inStock}
						icon={<BsCartCheck />}
						style={"rgb(249, 155, 125,0.7)"}
					/>
				</section>
			</main>
			<section className="grid justify-items-center grid-cols-2 gap-10 md:grid-cols-1 md:gap-5 md:p-3">
				<Pie product={productsPlaces} blur={open.action} />
				<Missions setOpen={setOpen} open={open} />
				<Columns users={users} blur={open.action} />
				<Notification setOpen={setOpen} open={open} />
				{/* <Line users={users} blur={open.action} /> */}
			</section>
			<br />
		</>
	);
};
