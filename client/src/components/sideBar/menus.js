import { GrSystem } from "react-icons/gr";
import { HiOutlineUsers } from "react-icons/hi";
import { ImExit } from "react-icons/im";
import { MdOutlineManageAccounts } from "react-icons/md";
import {
	RiDeleteBin6Line,
	RiLockPasswordLine,
	RiProductHuntLine,
	RiSettings4Line,
} from "react-icons/ri";

export const menus = [
	{
		name: "משתמשים",
		title: "משתמשים",
		link: "/users",
		icon: HiOutlineUsers,
	},
	{
		name: "מוצרים",
		title: "מוצרים",
		link: "/",
		icon: RiProductHuntLine,
	},
];

export const accountSettings = [
	{
		name: "עדכון פרטים",
		title: "עדכון פרטים",
		link: "/settings",
		icon: MdOutlineManageAccounts,
	},

	{
		name: "עדכון סיסמא",
		title: "עדכון סיסמא",
		link: "/",
		icon: RiLockPasswordLine,
	},
	{
		name: "הגדרות מערכת",
		title: "הגדרות מערכת",
		link: "/",
		icon: GrSystem,
	},
	{
		name: "מחיקת חשבון",
		title: "מחיקת חשבון",
		link: "/",
		icon: RiDeleteBin6Line,
	},
];

export const settings = [
	{
		name: "הגדרות",
		title: "הגדרות",
		icon: RiSettings4Line,
	},
];

export const exit = [
	{
		name: "יציאה",
		title: "יציאה",
		link: "/",
		icon: ImExit,
		onClick: "logout",
	},
];
