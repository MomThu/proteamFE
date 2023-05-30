import { Layout } from 'antd';
import Loading from 'components/Loading';
import routesMap from 'layouts/routesMap';
import { trim } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Waiter } from 'react-wait';
import { getDataStorage, STORAGE_KEY } from 'utils/storage';
import AppHeader from './AppHeader';
import Socket from '../../plugins/socket';

const { Content } = Layout;

const PrivateLayout: React.FC = () => {
  const isLogged = useMemo(() => {
    return Boolean(trim(getDataStorage(STORAGE_KEY.ACCESS_TOKEN)));
  }, []);

  useEffect(() => {
    if (isLogged) {
      console.log('connect socket');
      const user = getDataStorage(STORAGE_KEY.USER_INFO) as UserInfo;
      Socket.connect({
        senderId: user?.account_id || 0,
        senderEmail: user?.email || '',
      });
    }

    return () => {
      Socket.disconnect();
    };
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
