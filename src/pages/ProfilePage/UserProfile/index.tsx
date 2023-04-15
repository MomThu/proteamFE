/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Button, Card, Image, Space, Typography } from 'antd';
import { isEmpty } from 'lodash';

import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionGetUserProfile } from 'redux/profile/actions';
import { selectorUserProfile } from 'redux/profile/selectors';
import logo from 'assets/image/page-404.jpeg';
import { actionAcceptFriend, actionRequestFriend, actionUnFriend } from 'redux/network/actions';
import { notificationError, notificationSuccess } from 'utils/notifications';
import { getMessageError } from 'utils/common';

const { Title } = Typography;

const UserProfile = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectorUserProfile);

  const queryString = window.location.search;
  const id = queryString.slice(1);

  useEffect(() => {
    const payload = {
      id: Number(id),
    };
    dispatch(actionGetUserProfile(payload)).unwrap();
  }, [dispatch, id]);

  const handleUnfriend = async () => {
    try {
      const payload = {
        friend_id: Number(id),
      };
      await dispatch(actionUnFriend(payload)).unwrap();
      notificationSuccess('Unfriend successful!');
      const payloadReload = {
        id: Number(id),
      };
      dispatch(actionGetUserProfile(payloadReload)).unwrap();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const handleAccept = async () => {
    try {
      const payload = {
        id: Number(id),
        status: 1,
      };
      await dispatch(actionAcceptFriend(payload)).unwrap();
      notificationSuccess('Accept successful!');
      const payloadReload = {
        id: Number(id),
      };
      dispatch(actionGetUserProfile(payloadReload)).unwrap();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const handleCancel = async () => {
    try {
      const payload = {
        id: Number(id),
        status: 2,
      };
      await dispatch(actionAcceptFriend(payload)).unwrap();
      notificationSuccess('Cancel successful!');
      const payloadReload = {
        id: Number(id),
      };
      dispatch(actionGetUserProfile(payloadReload)).unwrap();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const handleAddFriend = async () => {
    try {
      const payload = {
        friend_id: Number(id),
      };
      await dispatch(actionRequestFriend(payload)).unwrap();
      notificationSuccess('Add friend successful!');
      const payloadReload = {
        id: Number(id),
      };
      dispatch(actionGetUserProfile(payloadReload)).unwrap();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  return (
    <div>
      <div className="flex justify-between bg-[#fff] p-10">
        <div className="flex flex-wrap">
          {profile?.avatar ? (
            <Image
              src={profile?.avatar}
              alt="ava"
              preview={false}
              width={200}
              className="shadow rounded-full max-w-full h-auto align-middle border-none"
            />
          ) : (
            <Image
              src={logo}
              alt="ava"
              preview={false}
              width={200}
              className="shadow rounded-full max-w-full h-auto align-middle border-none"
            />
          )}
          <Space direction="vertical" className="mt-10 ml-10 flex flex-col">
            <Title>{profile?.name}</Title>
            {profile?.school && <Title level={5}>School: {profile.school}</Title>}
            {profile?.major && <Title level={5}>Major: {profile.major}</Title>}
          </Space>
        </div>
        <div>
          {profile.friend === 1 ? (
            <Button onClick={handleUnfriend}>UnFriend</Button>
          ) : profile.friend === 3 ? (
            <div>
              <Button onClick={handleAccept}>Accept</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </div>
          ) : profile.friend === 4 ? (
            <Button onClick={handleAddFriend}>Add Friend</Button>
          ) : profile.friend === 2 ? (
            <div>Sending request</div>
          ) : null}
        </div>
      </div>
      {!isEmpty(profile) && (
        <Card className="mt-10">
          <Title level={3} className="text-left">
            Detail Information
          </Title>
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
