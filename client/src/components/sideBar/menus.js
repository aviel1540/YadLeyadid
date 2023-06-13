import { AiOutlineHome } from 'react-icons/ai';
import { GiShoppingCart } from 'react-icons/gi';
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineUsers } from 'react-icons/hi';
import { ImExit } from 'react-icons/im';
import { RiSettings4Line } from 'react-icons/ri';
import { BiCategory } from 'react-icons/bi';
import { MdOutlineCategory } from 'react-icons/md';

export const menus = [
  {
    name: 'בית',
    title: 'בית',
    link: '/home',
    icon: AiOutlineHome,
    margin: true,
  },
  {
    name: 'לקוחות',
    title: 'לקוחות',
    link: '/users',
    icon: HiOutlineUsers,
  },
  {
    name: 'מוצרים',
    title: 'מוצרים',
    link: '/products',
    icon: GiShoppingCart,
  },
  {
    name: 'קטגוריה משנית',
    title: 'קטגוריה משנית',
    link: '/semi-category',
    icon: MdOutlineCategory,
  },
  {
    name: 'קטגוריה ראשית',
    title: 'קטגוריה ראשית',
    link: '/main-category',
    icon: BiCategory,
  },
];

export const settings = [
  {
    name: 'מנהלי מערכת',
    title: 'מנהלי מערכת',
    icon: GrUserAdmin,
    link: '/administrator',
    margin: true,
  },
  // {
  //   name: 'הגדרות',
  //   title: 'הגדרות',
  //   icon: RiSettings4Line,
  //   link: '/settings',
  // },
  {
    name: 'יציאה',
    title: 'יציאה',
    link: '/',
    icon: ImExit,
    onClick: 'logout',
  },
];
