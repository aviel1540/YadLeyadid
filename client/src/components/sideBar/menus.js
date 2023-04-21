import { HiOutlineUsers } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { RiProductHuntLine, RiSettings4Line } from "react-icons/ri";

export const menus = [
	{
		name: "משתמשים",
		title: "משתמשים",
		link: "/users",
		icon: HiOutlineUsers,
		margin: true,
	},
	{
		name: "מוצרים",
		title: "מוצרים",
		link: "/products",
		icon: RiProductHuntLine,
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
