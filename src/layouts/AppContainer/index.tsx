import Loading from 'components/Loading';
import { AppRouteType, delayLazyLoad } from 'layouts/helper';
import PrivateLayout, { useRoutes as usePrivateRoutes } from 'layouts/PrivateLayout';
import PublicLayout, { useRoutes as usePublicRoutes } from 'layouts/PublicLayout';
import React, { lazy } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

const Page404 = lazy(() => delayLazyLoad(import('components/Page404')));

const makeRoutes = (routes: AppRouteType[]): JSX.Element[] => {
  return routes.map((route, idx) => {
    const { component: Component } = route;
    return <Route key={idx} path={route.path} element={<Component />} />;
  });
};

const AppContainer: React.FC = () => {
  const routePrivate = usePrivateRoutes();
  const routePublic = usePublicRoutes();

  return (
    <React.Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Outlet />}>
          {/* Public routes */}
          <Route element={<PublicLayout />}>{makeRoutes(routePublic)}</Route>

          {/* Private route */}
          <Route element={<PrivateLayout />}>{makeRoutes(routePrivate)}</Route>

          {/* Catch all */}
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default AppContainer;
