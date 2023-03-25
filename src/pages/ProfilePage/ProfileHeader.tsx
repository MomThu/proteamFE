import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, Form, Image, Input, InputNumber, Modal, Row, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionGetProfile, actionUpdateProfile } from 'redux/profile/actions';
import { selectorProfile } from 'redux/profile/selectors';
import logo from 'assets/image/page-404.jpeg';
import { EditOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import routesMap from 'layouts/routesMap';
import { notificationError, notificationSuccess } from 'utils/notifications';
import { getMessageError } from 'utils/common';

const { Title, Text } = Typography;

const ProfileHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const profile = useAppSelector(selectorProfile);
  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
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
    console.log('Success:', values);
    try {
      await dispatch(actionUpdateProfile(values)).unwrap();
      notificationSuccess("Information Update Successful!");
      setOpenModal(false);
      form.resetFields();
    } catch(error) {
      notificationError(getMessageError(error));
    }
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
            <Title level={5}>School: {profile.school}</Title>
            <Title level={5}>Major: {profile.major}</Title>
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
      <div className="mt-10">
        <Title className="text-left">Thông tin chung</Title>
        <Space direction="vertical" className="">
          <Title level={5}>GPA: {profile.gpa}</Title>
          <Title level={5}>Email: {profile.email}</Title>
          <Title level={5}>Linkedin Link: {profile.linkedln_link}</Title>
          <Title level={5}>Phone: {profile.phone}</Title>
        </Space>
      </div>
      <Modal
        title="Edit profile"
        open={openModal}
        onOk={onFinish}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="editProfile"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
        >
          <Form.Item
            label="Fullname"
            name="name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
            initialValue={profile.name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="GPA"
            name="gpa"
            initialValue={profile.phone}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="School"
            name="school"
            initialValue={profile.school}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Major"
            name="major"
            initialValue={profile.major}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Linkedin Link"
            name="linkedln_link"
            initialValue={profile.linkedln_link}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            initialValue={profile.phone}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
