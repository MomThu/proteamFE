import { Layout } from 'antd';
import Loading from 'components/Loading';
import routesMaps from 'layouts/routesMap';
import { trim } from 'lodash';
import React, { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Waiter } from 'react-wait';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

const { Content } = Layout;

const PrivateLayout: React.FC = () => {
  const isLogged =  false;

  // return isLogged ? (
  //   <Layout className="min-h-screen">
  //     <AppSidebar />
  //     <Layout className="bg-[#EAF0F5]">
  //       <AppHeader />
  //       <Content className="px-6 py-3">
  //         <Waiter>
  //           <React.Suspense fallback={<Loading />}>
  //             <Outlet />
  //           </React.Suspense>
  //         </Waiter>
  //       </Content>
  //     </Layout>
  //   </Layout>
  // ) : (
  //   <Navigate to={routesMaps.LOGIN} />
  // );
  return (
    <Layout className="min-h-screen">
      <AppSidebar />
      <Layout className="bg-[#EAF0F5]">
        <AppHeader />
        <Content className="px-6 py-3">
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
