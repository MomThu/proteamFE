import { useAppSelector } from 'app/hooks';
import { NavLinkItem } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { useMemo } from 'react';
import { FiBell, FiHome, FiMessageCircle, FiUser, FiUsers } from 'react-icons/fi';
import { selectorNotificationList } from 'redux/notification/selectors';

interface NavLinkItemCustom extends NavLinkItem {
  badge?: number;
}

export function useNavs() {
  const notificationList = useAppSelector(selectorNotificationList);

  const chatNoti = useMemo(() => {
    return notificationList?.filter((item) => item.type === 'chat_service').length;
  }, [notificationList]);

  const navs: Array<NavLinkItemCustom> = [
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
      badge: chatNoti || 0,
    },
    {
      name: 'Notification',
      key: routesMap.NOTIFICATION,
      icon: FiBell,
    },
  ];

  return useMemo(() => navs, [notificationList]);
}
