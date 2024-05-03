import { LuPieChart } from 'react-icons/lu';

export const links = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    pathnameInclude: 'dashboard',
    icon: <LuPieChart />,
  },
  {
    title: 'Expense',
    path: '/expense/list',
    pathnameInclude: 'expense',
    icon: <LuPieChart />,
  },
  
];

export const adminLink = [
  {
    title: 'Admin',
    path: '/admin/',
    pathnameInclude: 'admin',
    subLinks: [
      { title: 'Category', path: '/admin/category/list' },
      { title: 'Users', path: '/admin/users/list' },
    ],
    icon: <LuPieChart />,
  },
  
];
