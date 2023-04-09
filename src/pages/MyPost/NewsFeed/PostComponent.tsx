/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Card, Dropdown, Form, Input, MenuProps, Modal, Typography, Image } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { actionDeletePost, actionGetAllPosts, actionUpdatePost } from 'redux/post/actions';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { notificationError, notificationSuccess } from 'utils/notifications';
import { selectorUserInfo } from 'redux/auth/selectors';
import { getMessageError } from 'utils/common';
import moment from 'moment';
import { TIME_FORMAT_6 } from 'utils/time';

const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return { key, icon, children, label, type } as MenuItem;
};

interface IProps {
  data?: Post.Post;
}

const PostComponent = (props: IProps) => {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(selectorUserInfo);

  const [form] = Form.useForm();

  const [openModal, setOpenModal] = useState(false);
  const [openModalDiscardChange, setOpenModalDiscardChange] = useState(false);

  const onUpdatePost = () => {
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
      await dispatch(actionUpdatePost(values)).unwrap();
      notificationSuccess('Post Update Successful!');
      setOpenModal(false);
      dispatch(actionGetAllPosts()).unwrap();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const onDeletePost = useCallback(async () => {
    try {
      const payload = {
        post_id: props.data?.post_id,
      };
      await dispatch(actionDeletePost(payload)).unwrap();
      notificationSuccess('Delete successful!');
      dispatch(actionGetAllPosts()).unwrap();
    } catch (error) {
      notificationError('Delete failed!');
    }
  }, [dispatch, props.data?.post_id]);

  const items = useMemo(
    (): MenuItem[] => [
      getItem(
        'dropdown-update',
        <Text className="font-medium hover:text-primary" onClick={onUpdatePost}>
          Update this post
        </Text>
      ),
      getItem(
        'dropdown-delete',
        <Text className="font-medium hover:text-primary" onClick={onDeletePost}>
          Delete this post
        </Text>
      ),
    ],
    [onDeletePost]
  );

  return (
    <div className="m-10">
      <Card>
        <div className="font-bold">{userInfo?.name}</div>
        <div className="font-thin text-xs">
          {props.data?.create_time ? moment(props.data?.create_time).format(TIME_FORMAT_6) : ''}
        </div>
        <div className="flex flex-row justify-between">
          <div>{props.data?.content}</div>
          <Dropdown menu={{ items }} placement="bottomRight">
            {/* <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" /> */}
            <Text className="text-sm cursor-pointer flex min-w-[150px] gap-3">
              <MoreOutlined className="ml-2" />
            </Text>
          </Dropdown>
        </div>
        <div>
          {props.data?.image ? (
            <Image
              src={props.data?.image}
              alt="ghtm"
              preview={false}
              width={200}
              className="shadow rounded-full max-w-full h-auto align-middle border-none"
            />
          ) : null}
        </div>
      </Card>
      <Modal title="Edit post" open={openModal} onOk={onFinish} onCancel={handleCancel} footer={null}>
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
            <Form.Item
              label="Fullname"
              name="name"
              rules={[{ required: true, message: 'Please input your full name!' }]}
              // initialValue={profile.name}
            >
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

export default PostComponent;
