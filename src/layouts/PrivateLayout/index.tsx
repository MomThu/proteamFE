import { Layout } from 'antd';
import Loading from 'components/Loading';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Waiter } from 'react-wait';
import AppHeader from './AppHeader';

const { Content } = Layout;

const PrivateLayout: React.FC = () => {
  return (
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
  )
};

export default PrivateLayout;
export * from './useRoutes';
