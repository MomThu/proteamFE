import { AppRouteType, delayLazyLoad } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { lazy, useMemo } from 'react';

const LoginPage = lazy(() => delayLazyLoad(import('pages/auth/LoginPage')));
const GoogleLoginPage = lazy(() => delayLazyLoad(import('pages/auth/GoogleLoginPage')));
const ForgottenPasswordPage = lazy(() => delayLazyLoad(import('pages/auth/ForgottenPasswordPage')));
const ResetPasswordPage = lazy(() => delayLazyLoad(import('pages/auth/ResetPasswordPage')));

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
  {
    path: routesMap.FORGOTTEN_PASSWORD,
    component: ForgottenPasswordPage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
  {
    path: routesMap.RESET_PASSWORD,
    component: ResetPasswordPage,
    rule: -1,
    openKey: [],
    activeKey: [],
  },
];

export function useRoutes() {
  return useMemo(() => routes, []);
}
