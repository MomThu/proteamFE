import React from 'react';
import { Typography } from 'antd'
import ProfileHeader from './ProfileHeader';
import ProfileDetail from './ProfileDetail';

const {Text, Title} = Typography
const ProfilePage: React.FC = () => {
  return (
    <div>
      <div>
        <Title>Profile</Title>
      </div>
      <div>
        <ProfileHeader />
        <ProfileDetail />
      </div>
      
    </div>
  )
};

export default ProfilePage;
