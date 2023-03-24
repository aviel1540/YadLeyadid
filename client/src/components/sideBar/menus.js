import { ImExit } from "react-icons/im";
import { RiSettings4Line } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

export const menus = [
	{
		name: "משתמשים",
		title: "משתמשים",
		link: "/users",
		icon: AiOutlineUser,
	},
];

export const settings = [
	// {
	// 	name: "הנפקת קופון",
	// 	title: "הנפקת קופון",
	// 	link: "/employees",
	// 	icon: HiOutlineDocumentAdd,
	// 	margin: true,
	// },
	{
		name: "הגדרות",
		title: "הגדרות",
		link: "/",
		icon: RiSettings4Line,
	},

	{
		name: "יציאה",
		title: "יציאה",
		link: "/",
		icon: ImExit,
		onClick: "logout",
	},
];
