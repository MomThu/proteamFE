import { Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

const ProfileDetail = ({profile}) => {
  const profileFake = {
    name: 'Tien',
    email: 'tiencho@gmail.com',
    gpa: '3.4',
    school: 'NEU',
    major: 'accounting',
    linkedinLink: 'ancutcho',
    phone: '010233300',
  };
  return (
    <div>
      <div className="mt-10">
        <Title className="text-left">Thông tin chung</Title>
        <Space direction="vertical" className="">
          <Title level={5}>GPA: {profileFake.gpa}</Title>
          <Title level={5}>Email: {profileFake.email}</Title>
          <Title level={5}>Linkedin Link: {profileFake.linkedinLink}</Title>
          <Title level={5}>Phone: {profileFake.phone}</Title>
        </Space>
      </div>
    </div>
  );
};

export default ProfileDetail;
