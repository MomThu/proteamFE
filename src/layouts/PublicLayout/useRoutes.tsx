import { AppRouteType, delayLazyLoad } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { lazy, useMemo } from 'react';

const LoginPage = lazy(() => delayLazyLoad(import('pages/LoginPage')));
const GoogleLoginPage = lazy(() => delayLazyLoad(import('pages/GoogleLoginPage')));

const routes: AppRouteType[] = [
  {
    path: routesMap.LOGIN,
    component: LoginPage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
  {
    path: routesMap.GOOGLE_LOGIN,
    component: GoogleLoginPage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
];

export function useRoutes() {
  return useMemo(() => routes, []);
}
