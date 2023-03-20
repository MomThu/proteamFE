import { Layout } from 'antd';
import Loading from 'components/Loading';
import routesMap from 'layouts/routesMap';
import { trim } from 'lodash';
import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Waiter } from 'react-wait';
import { getDataStorage, STORAGE_KEY } from 'utils/storage';
import AppHeader from './AppHeader';

const { Content } = Layout;

const PrivateLayout: React.FC = () => {
  const isLogged = useMemo(() => {
    return Boolean(trim(getDataStorage(STORAGE_KEY.ACCESS_TOKEN)));
  }, []);

  return isLogged ? (
    <Layout className="min-h-screen">
      <Layout className="bg-[#EAF0F5]">
        <AppHeader />
        <Content className="px-6 py-5">
          <Waiter>
            <React.Suspense fallback={<Loading />}>
              <Outlet />
            </React.Suspense>
          </Waiter>
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Navigate to={routesMap.LOGIN} />
  );
};

export default PrivateLayout;
export * from './useRoutes';
