/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useMemo, useState } from 'react';
import { Button, Card, Dropdown, Form, Input, MenuProps, Modal, Typography, Image } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import { actionDeletePost, actionGetAllPostsUser, actionUpdatePost } from 'redux/post/actions';
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
    const payload = {
      ...values,
      post_id: props.data?.post_id,
    };
    try {
      await dispatch(actionUpdatePost(payload)).unwrap();
      notificationSuccess('Post Update Successful!');
      setOpenModal(false);
      dispatch(actionGetAllPostsUser()).unwrap();
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
      dispatch(actionGetAllPostsUser()).unwrap();
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
        <div className="flex flex-row justify-between">
          <div>
            <div className="font-bold">{userInfo?.name}</div>
            <div className="font-thin text-xs">
              {props.data?.create_time ? moment(props.data?.create_time).format(TIME_FORMAT_6) : ''}
            </div>
          </div>
          <Dropdown menu={{ items }} placement="bottomRight">
            {/* <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" /> */}
            <Text>
              <MoreOutlined className="ml-2" />
            </Text>
          </Dropdown>
        </div>
        <div>{props.data?.content}</div>
        <div>
          {props.data?.image ? (
            <Image
              src={props.data?.image}
              alt="postImage"
              preview={false}
              width={300}
              // height={300}
              className="shadow max-w-full h-auto border-none"
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
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please edit your content!' }]}
              initialValue={props.data?.content}
            >
              <Input.TextArea
                placeholder="What do you want to talk about?"
                autoSize={{ minRows: 4, maxRows: 6 }}
              />
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
