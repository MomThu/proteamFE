import React, { useEffect } from 'react';
import { Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionGetProfile } from 'redux/profile/actions';
import { selectorProfile } from 'redux/profile/selectors';

import ProfileHeader from './ProfileHeader';
import ProfileDetail from './ProfileDetail';

const { Text, Title } = Typography;
const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectorProfile);

  useEffect(() => {
    dispatch(actionGetProfile);
  }, [dispatch]);

  return (
    <div>
      <div>
        <ProfileHeader />
        <ProfileDetail />
      </div>
    </div>
  );
};

export default ProfilePage;
