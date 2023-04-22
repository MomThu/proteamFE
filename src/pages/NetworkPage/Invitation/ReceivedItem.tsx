/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Row, Typography, Image, Avatar } from 'antd';
import { useAppDispatch } from 'app/hooks';
import React from 'react';
import { actionAcceptFriend } from 'redux/network/actions';
import { getMessageError } from 'utils/common';
import { notificationError, notificationSuccess } from 'utils/notifications';

const { Link } = Typography;

type Props = {
  data: User.Profile;
  onReload: () => void;
};

const ReceivedItem: React.FC<Props> = (props: any) => {
  const dispatch = useAppDispatch();
  const { data, onReload } = props;

  const handleAccept = async () => {
    try {
      const payload = {
        id: data.account_id,
        status: 1,
      };
      await dispatch(actionAcceptFriend(payload)).unwrap();
      notificationSuccess('Accept successful!');
      onReload();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const handleCancel = async () => {
    try {
      const payload = {
        id: data.account_id,
        status: 2,
      };
      await dispatch(actionAcceptFriend(payload)).unwrap();
      notificationSuccess('Delete successful!');
      onReload();
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };
  return (
    <div className="p-6 m-2 bg-[#D6EAF8]">
      <Row>
        <Col span={18}>
          <Row>
            <Col span={2}>
              <div className="friend-img">
                {data?.avatar ? (
                  <Image
                    src={data?.avatar}
                    alt="avatar"
                    preview={false}
                    width={50}
                    className="shadow rounded-full max-w-full h-auto border-none"
                  />
                ) : (
                  <Avatar size={50} icon={<UserOutlined />} className="mr-3 cursor-pointer" />
                )}
              </div>
            </Col>
            <Col span={22} className="friend-text">
              <Link href={`/profile/user?${data.account_id}`}>
                {data.name}
              </Link>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Button type="primary" onClick={handleAccept} className="mr-5">
            ACCEPT
          </Button>
          <Button onClick={handleCancel}>DELETE</Button>
        </Col>
      </Row>
    </div>
  );
};

export default ReceivedItem;
