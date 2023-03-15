import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb, Typography } from 'antd';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

interface HeaderProps {
  breadcrumb: string[];
  showBack?: boolean;
  onPressBack?: () => void;
}

const HeaderPage: React.FC<HeaderProps> = ({ breadcrumb, showBack, onPressBack }) => {
  const navigate = useNavigate();

  const handleGoBack = (): void => {
    if (onPressBack) {
      onPressBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="w-[100%] mb-3">
      <div className="flex items-center">
        {showBack && <FaArrowLeft size={18} className="mr-5 mt-1 cursor-pointer" onClick={handleGoBack} />}
        <Title level={4} style={{ marginBottom: 0 }}>
          {breadcrumb[breadcrumb.length - 1]}
        </Title>
      </div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item className="text-xs" key="/">
          <HomeOutlined />
        </Breadcrumb.Item>
        {breadcrumb.map((title, idx) => (
          <Breadcrumb.Item key={idx} className="text-xs">
            {title}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default HeaderPage;
