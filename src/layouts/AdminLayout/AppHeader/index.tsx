import { Layout } from 'antd';
import InfoSystem from 'components/InfoSystem';
import React from 'react';
import AppSidebar from '../AppSidebar';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header-bar bg-white px-[30px]">
      <div className="flex flex-row w-[100%] h-[100%] items-center justify-between">
        <AppSidebar />
        <div className="mx-2 bg-[#e1e1e1] w-[1px] h-[38px]" />
        <InfoSystem />
      </div>
    </Header>
  );
};

export default AppHeader;
