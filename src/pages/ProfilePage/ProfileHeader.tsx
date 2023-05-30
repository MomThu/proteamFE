/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Image, Input, InputNumber, Modal, Space, Typography } from 'antd';
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionGetProfile, actionUpdateProfile } from 'redux/profile/actions';
import { selectorProfile } from 'redux/profile/selectors';
import UploadAvatar from 'components/base/UpLoad/UploadAvatar';
import BaseUploadFile from 'components/base/UpLoad/UploadFile';
import verified from 'assets/image/ic_verified@2x.png';
import { FiEdit } from 'react-icons/fi';
import { notificationError, notificationSuccess } from 'utils/notifications';
import { getMessageError } from 'utils/common';
import Skill from './Skill';

const { Title, Link } = Typography;

const ProfileHeader = () => {
  const dispatch = useAppDispatch();

  const profile = useAppSelector(selectorProfile);

  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [openModalDiscardChange, setOpenModalDiscardChange] = useState(false);

  useEffect(() => {
    dispatch(actionGetProfile()).unwrap();
  }, [dispatch]);

  const handleEditProfile = () => {
    setOpenModal(true);
  };

  const handleCancel = () => {
    setOpenModalDiscardChange(true);
  };

  const handleOkDiscard = () => {
    setOpenModalDiscardChange(false);
    setOpenModal(false);
    form.resetFields();
  };

  const handleCancelDiscard = () => {
    setOpenModalDiscardChange(false);
  };

  const onFinish = async (values: any) => {
    try {
      await dispatch(actionUpdateProfile(values)).unwrap();
      notificationSuccess('Information Update Successful!');
      setOpenModal(false);
      dispatch(actionGetProfile()).unwrap();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const handleUploadSuccess = async (id: number, url: string) => {
    const payload = {
      avatar: url,
    };
    await dispatch(actionUpdateProfile(payload)).unwrap();
    dispatch(actionGetProfile()).unwrap();
  };

  const onUploadFileSuccessful = async (id: number, url: string) => {
    try {
      const payload = {
        cv: url,
      };
      await dispatch(actionUpdateProfile(payload)).unwrap();
      notificationSuccess('Upload successful!');
      dispatch(actionGetProfile()).unwrap();
    } catch (err) {
      notificationError('Upload failed!');
    }
  };

  return (
    <div>
      <div className="flex justify-between bg-[#D6EAF8] p-10">
        <div className="flex flex-wrap">
          {profile?.avatar ? (
            <Image
              src={profile?.avatar}
              alt="avatar"
              preview={false}
              width={200}
              className="shadow rounded-full max-w-full h-auto align-middle border-none"
            />
          ) : (
            <UploadAvatar onSuccess={handleUploadSuccess} />
          )}
          <Space direction="vertical" className={`mt-10 flex flex-col ${profile?.avatar ? 'ml-10' : ''}`}>
            <div className="flex flex-row">
              <Title>{profile?.name}</Title>
              {profile?.role === 2 && (
                <Image src={verified} alt="verified" preview={false} className="justify-items-center" />
              )}
            </div>
            {profile?.role === 2 ? (
              <div>
                {profile?.school && <Title level={5}>Company: {profile.school}</Title>}
                {profile?.major && <Title level={5}>Major: {profile.major}</Title>}
              </div>
            ) : (
              <div>
                {profile?.school && <Title level={5}>School: {profile.school}</Title>}
                {profile?.major && <Title level={5}>Major: {profile.major}</Title>}
              </div>
            )}
          </Space>
        </div>
        <div>
          <FiEdit
            size={30}
            title="Edit Profile"
            onClick={() => handleEditProfile()}
            className="cursor-pointer hover:text-primary"
          />
        </div>
      </div>
      {!isEmpty(profile) && (
        <Card className="mt-10">
          <Title className="text-left">Detail Information</Title>
          {profile?.role === 2 ? (
            <Space direction="vertical" className="">
              {profile.email && <Title level={5}>Email: {profile.email}</Title>}
              {profile.linkedln_link && <Title level={5}>Linkedin Link: {profile.linkedln_link}</Title>}
              {profile.phone && <Title level={5}>Phone: {profile.phone}</Title>}
            </Space>
          ) : (
            <Space direction="vertical" className="">
              {profile.gpa && <Title level={5}>GPA: {profile.gpa}</Title>}
              {profile.email && <Title level={5}>Email: {profile.email}</Title>}
              {profile.linkedln_link && <Title level={5}>Linkedin Link: {profile.linkedln_link}</Title>}
              {profile.phone && <Title level={5}>Phone: {profile.phone}</Title>}
            </Space>
          )}
        </Card>
      )}
      {profile?.cv ? (
        <div className="mt-10 flex gap-3 items-center">
          <BaseUploadFile onSuccess={onUploadFileSuccessful} />
          <Link className="text-[20px]" href={profile?.cv} target="_blank">
            View your CV here
          </Link>
        </div>
      ) : (
        <div className="mt-10">
          <BaseUploadFile onSuccess={onUploadFileSuccessful} />
        </div>
      )}
      <Skill />
      {profile?.role === 2 ? (
        <Modal title="Edit profile" open={openModal} onOk={onFinish} onCancel={handleCancel} footer={null}>
          <Form
            name="editProfile"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <div>
              <Title level={5}>General Information</Title>

              <Form.Item
                label="Fullname"
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
                initialValue={profile.name}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Company" name="school" initialValue={profile.school}>
                <Input />
              </Form.Item>

              <Form.Item label="Major" name="major" initialValue={profile.major}>
                <Input />
              </Form.Item>
            </div>

            <div>
              <Title level={5}>Detail Information</Title>
              <Form.Item label="Linkedin Link" name="linkedln_link" initialValue={profile.linkedln_link}>
                <Input />
              </Form.Item>

              <Form.Item label="Phone Number" name="phone" initialValue={profile.phone}>
                <Input />
              </Form.Item>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      ) : (
        <Modal title="Edit profile" open={openModal} onOk={onFinish} onCancel={handleCancel} footer={null}>
          <Form
            name="editProfile"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            form={form}
          >
            <div>
              <Title level={5}>General Information</Title>

              <Form.Item
                label="Fullname"
                name="name"
                rules={[{ required: true, message: 'Please input your full name!' }]}
                initialValue={profile.name}
              >
                <Input />
              </Form.Item>

              <Form.Item label="School" name="school" initialValue={profile.school}>
                <Input />
              </Form.Item>

              <Form.Item label="Major" name="major" initialValue={profile.major}>
                <Input />
              </Form.Item>
            </div>

            <div>
              <Title level={5}>Detail Information</Title>

              <Form.Item label="GPA" name="gpa" initialValue={profile.gpa}>
                <InputNumber />
              </Form.Item>

              <Form.Item label="Linkedin Link" name="linkedln_link" initialValue={profile.linkedln_link}>
                <Input />
              </Form.Item>

              <Form.Item label="Phone Number" name="phone" initialValue={profile.phone}>
                <Input />
              </Form.Item>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}

      <Modal
        title="Discard changes"
        open={openModalDiscardChange}
        onOk={handleOkDiscard}
        onCancel={handleCancelDiscard}
        okText="Discard"
        cancelText="No thanks"
      >
        <p>Are you sure you want to discard the changes you made?</p>
      </Modal>
    </div>
  );
};

export default ProfileHeader;
