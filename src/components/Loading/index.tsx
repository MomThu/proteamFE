import { Skeleton } from 'antd';
import React from 'react';

const Loading: React.FC = () => {
  return <Skeleton active round paragraph={{ rows: 5 }} />;
};

export default Loading;
