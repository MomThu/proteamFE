import { AppRouteType, delayLazyLoad } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { lazy, useMemo } from 'react';

const HomePage = lazy(() => delayLazyLoad(import('pages/HomePage')));
const ProfilePage = lazy(() => delayLazyLoad(import('pages/ProfilePage')));

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
];

export function useRoutes() {
  return useMemo(() => routes, []);
}
