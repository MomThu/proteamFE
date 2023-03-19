import { Button, Image } from 'antd';
import Title from 'antd/lib/typography/Title';
import Img404 from 'assets/image/page-404.jpeg';
import InfoSystem from 'components/InfoSystem';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Page404: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToHome = (): void => {
    navigate('/');
  };

  return (
    <div style={{ padding: '20px 30px' }} className="h-[100vh] bg-slate-50">
      <div style={{ textAlign: 'end' }}>
        <InfoSystem />
      </div>
      <div className="h-[5%]"></div>
      <div style={{ textAlign: 'center' }}>
        <Image width={200} src={Img404} preview={false} className="rounded-md" />
        <Title level={4}>Trang không tồn tại hoặc bạn không có quyền truy cập !!!</Title>
        <br />
        <br />
        <Button type="primary" className="font-bold rounded-md" onClick={handleGoToHome}>
          Trang chủ
        </Button>
      </div>
    </div>
  );
};

export default Page404;
