import Loading from 'components/Loading';
import React from 'react';
import { Outlet } from 'react-router-dom';
// import { Waiter } from 'react-wait';

const PublicLayout: React.FC = () => {
  return (
    <React.Suspense fallback={<Loading />}>
      {/* <Waiter> */}
        <Outlet />
      {/* </Waiter> */}
    </React.Suspense>
  );
};

export default PublicLayout;
export * from './useRoutes';
