import { AppRouteType, delayLazyLoad } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { lazy, useMemo } from 'react';

const HomePage = lazy(() => delayLazyLoad(import('pages/HomePage')));
const ProfilePage = lazy(() => delayLazyLoad(import('pages/ProfilePage')));
const UserProfilePage = lazy(() => delayLazyLoad(import('pages/ProfilePage/UserProfile')));
const NetworkPage = lazy(() => delayLazyLoad(import('pages/NetworkPage')));
const ChatPage = lazy(() => delayLazyLoad(import('pages/ChatPage')));
const NotificationPage = lazy(() => delayLazyLoad(import('pages/NotificationPage')));
const UserPostPage = lazy(() => delayLazyLoad(import('pages/MyPost')));
const ChangePasswordPage = lazy(() => delayLazyLoad(import('pages/auth/ChangePasswordPage')));

const routes: AppRouteType[] = [
  {
    path: routesMap.HOME,
    component: HomePage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
  {
    path: routesMap.PROFILE,
    component: ProfilePage,
    rule: -1,
    openKey: [],
    activeKey: [routesMap.PROFILE],
  },
  {
    path: routesMap.NETWORK,
    component: NetworkPage,
    rule: -1,
    openKey: [],
    activeKey: [routesMap.NETWORK],
  },
  {
    path: routesMap.CHAT,
    component: ChatPage,
    rule: -1,
    openKey: [],
    activeKey: [routesMap.CHAT],
  },
  {
    path: routesMap.NOTIFICATION,
    component: NotificationPage,
    rule: -1,
    openKey: [],
    activeKey: [routesMap.NOTIFICATION],
  },
  {
    path: routesMap.USER_PROFILE,
    component: UserProfilePage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
  {
    path: routesMap.MYPOST,
    component: UserPostPage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
  {
    path: routesMap.CHANGE_PASSWORD,
    component: ChangePasswordPage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
];

export function useRoutes() {
  return useMemo(() => routes, []);
}
