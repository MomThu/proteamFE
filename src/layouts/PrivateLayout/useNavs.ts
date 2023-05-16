import { NavLinkItem } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { useMemo } from 'react';
import { FiBell, FiHome, FiMessageCircle, FiUser, FiUsers } from 'react-icons/fi';

const navs: Array<NavLinkItem> = [
  {
    name: 'HomePage',
    key: routesMap.HOME,
    icon: FiHome,
  },
  {
    name: 'Profile',
    key: routesMap.PROFILE,
    icon: FiUser,
  },
  {
    name: 'Network',
    key: routesMap.NETWORK,
    icon: FiUsers,
  },
  {
    name: 'Chat',
    key: routesMap.CHAT,
    icon: FiMessageCircle,
  },
  {
    name: 'Notification',
    key: routesMap.NOTIFICATION,
    icon: FiBell,
  },
];

export function useNavs() {
  return useMemo(() => navs, []);
}
