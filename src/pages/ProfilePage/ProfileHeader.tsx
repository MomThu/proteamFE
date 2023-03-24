import React from "react";
import { Image, Space, Typography } from "antd";

import logo from 'assets/image/page-404.jpeg';

const { Title, Text } = Typography;

const ProfileHeader = () => {
  const profileFake = {
    name: 'Tien',
    email: 'tiencho@gmail.com',
    gpa: '3.4',
    school: 'NEU',
    major: 'accounting',
    linkedinLink: 'ancutcho',
    phone: '010233300'
  }
  return (
    <div>
      <div className="flex flex-wrap">
        <Image src={logo} alt="ghtm" preview={false} width={200} className="shadow rounded-full max-w-full h-auto align-middle border-none" />
        <Space direction="vertical" className="mt-10 ml-10 flex flex-col">
          <Title>{profileFake.name}</Title>
          <Title level={5}>School: {profileFake.school}</Title>
          <Title level={5}>Major: {profileFake.major}</Title>
        </Space>
      </div>
      <div className="mt-10">
        <Title className="text-left">Thông tin chung</Title>
        <Space direction="vertical" className="">
          <Title level={5}>GPA: {profileFake.gpa}</Title>
          <Title level={5}>Email: {profileFake.email}</Title>
          <Title level={5}>Linkedin Link: {profileFake.linkedinLink}</Title>
          <Title level={5}>Phone: {profileFake.phone}</Title>
        </Space>
      </div>
      <div className="flex justify-center">

      </div>
    </div>
  )
}

export default ProfileHeader;