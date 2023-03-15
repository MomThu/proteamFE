import { AppRouteType, delayLazyLoad } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { lazy, useMemo } from 'react';

const HomePage = lazy(() => delayLazyLoad(import('pages/HomePage')));

const routes: AppRouteType[] = [
  {
    path: routesMap.HOME,
    component: HomePage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
];

export function useRoutes() {
  return useMemo(() => routes, []);
}
