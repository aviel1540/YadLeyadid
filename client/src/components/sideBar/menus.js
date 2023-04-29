import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { RiSettings4Line } from "react-icons/ri";

export const menus = [
	{
		name: "לקוחות",
		title: "לקוחות",
		link: "/users",
		icon: HiOutlineUsers,
		margin: true,
	},
	{
		name: "מוצרים",
		title: "מוצרים",
		link: "/products",
		icon: GiShoppingCart,
	},
];

export const settings = [
	{
		name: "הגדרות",
		title: "הגדרות",
		icon: RiSettings4Line,
		link: "/settings",
		margin: true,
	},
	{
		name: "יציאה",
		title: "יציאה",
		link: "/",
		icon: ImExit,
		onClick: "logout",
	},
];
