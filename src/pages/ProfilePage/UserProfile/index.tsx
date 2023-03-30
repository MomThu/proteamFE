/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Card, Image, Space, Typography } from 'antd';
import { isEmpty } from 'lodash';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionGetUserProfile } from 'redux/profile/actions';
import { selectorUserProfile } from 'redux/profile/selectors';
import logo from 'assets/image/page-404.jpeg';

const { Title } = Typography;

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectorUserProfile);

  const queryString = window.location.search;
  const id = queryString.slice(1)
  
  useEffect(() => {
    const payload = {
      id: Number(id),
    }
    dispatch(actionGetUserProfile(payload)).unwrap();
  }, [dispatch, id]);

  return (
    <div>
      <div className="flex justify-between bg-[#D6EAF8] p-10">
        <div className="flex flex-wrap">
          <Image
            src={logo}
            alt="ghtm"
            preview={false}
            width={200}
            className="shadow rounded-full max-w-full h-auto align-middle border-none"
          />
          <Space direction="vertical" className="mt-10 ml-10 flex flex-col">
            <Title>{profile?.name}</Title>
            {profile?.school && <Title level={5}>School: {profile.school}</Title>}
            {profile?.major && <Title level={5}>Major: {profile.major}</Title>}
          </Space>
        </div>
      </div>
      {!isEmpty(profile) && (
        <Card className="mt-10">
          <Title className="text-left">Detail Information</Title>
          <Space direction="vertical" className="">
            {profile?.gpa && <Title level={5}>GPA: {profile.gpa}</Title>}
            {profile?.email && <Title level={5}>Email: {profile.email}</Title>}
            {profile?.linkedln_link && <Title level={5}>Linkedin Link: {profile.linkedln_link}</Title>}
            {profile?.phone && <Title level={5}>Phone: {profile.phone}</Title>}
          </Space>
        </Card>
      )}
    </div>
  );
};

export default UserProfile;
