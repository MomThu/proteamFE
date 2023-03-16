import { NavLinkItem } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { useMemo } from 'react';
import { FiArchive, FiHome, FiList, FiSettings, FiTool, FiTruck, FiUsers, FiBook } from 'react-icons/fi';

const navs: Array<NavLinkItem> = [
  {
    name: 'Trang chủ',
    key: routesMap.HOME,
    icon: FiHome,
  },
  {
    name: 'Profile',
    key: routesMap.PROFILE,
    icon: FiUsers,
  },
];

export function useNavs() {
  return useMemo(() => navs, []);
}
