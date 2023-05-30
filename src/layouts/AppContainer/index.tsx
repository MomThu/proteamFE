import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'components/Loading';
import { AppRouteType, delayLazyLoad } from 'layouts/helper';
import PrivateLayout, { useRoutes as usePrivateRoutes } from 'layouts/PrivateLayout';
import PublicLayout, { useRoutes as usePublicRoutes } from 'layouts/PublicLayout';
import AdminLayout, { useRoutes as useAdminRoutes } from 'layouts/AdminLayout';
import React, { lazy, useEffect } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import { actionAuthSetAccessToken, actionAuthSetInfoUser } from 'redux/auth/actions';
import { getDataStorage, STORAGE_KEY } from 'utils/storage';
import { selectorUserInfo } from 'redux/auth/selectors';

const Page404 = lazy(() => delayLazyLoad(import('components/Page404')));

const makeRoutes = (routes: AppRouteType[]): JSX.Element[] => {
  return routes.map((route, idx) => {
    const { component: Component } = route;
    return <Route key={idx} path={route.path} element={<Component />} />;
  });
};

const AppContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const routePrivate = usePrivateRoutes();
  const routePublic = usePublicRoutes();
  const routeAdmin = useAdminRoutes();

  const userInformation = useAppSelector(selectorUserInfo);

  useEffect(() => {
    const userInfo = getDataStorage(STORAGE_KEY.USER_INFO);
    const accessToken = getDataStorage(STORAGE_KEY.ACCESS_TOKEN);
    dispatch(actionAuthSetInfoUser(userInfo));
    dispatch(actionAuthSetAccessToken(accessToken));
  }, [dispatch]);

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* Public routes */}
          <Route element={<PublicLayout />}>{makeRoutes(routePublic)}</Route>

          {/* Private user route */}
          {userInformation && userInformation?.role === 1 ? (
            <Route element={<AdminLayout />}>{makeRoutes(routeAdmin)}</Route>
          ) : (
            <Route element={<PrivateLayout />}>{makeRoutes(routePrivate)}</Route>
          )}

          {/* Catch all */}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default AppContainer;
