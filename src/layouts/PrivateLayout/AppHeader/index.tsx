import { Layout } from 'antd';
import InfoSystem from 'components/InfoSystem';
import React from 'react';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header-bar bg-white px-[30px]">
      <div className="w-[100%] h-[100%] flex items-center justify-between">
        <div className="flex items-center">
          <div className="mx-2 bg-[#e1e1e1] w-[1px] h-[38px]" />
          <InfoSystem />
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
