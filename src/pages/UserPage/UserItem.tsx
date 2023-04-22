import { UserOutlined } from '@ant-design/icons';
import { Col, Row, Image, Avatar, Typography } from 'antd';
import React from 'react';

const { Link } = Typography;

type Props = {
  data: User.Profile;
  onReload: () => void;
};
const UserItem: React.FC<Props> = (props: Props) => {

  const { data } = props;

  return (
    <div className='bg-white m-10 p-5'>
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
          <Link href={`/profile/user?${data.account_id}`}>{data.name}</Link>
        </Col>
      </Row>
    </div>
  );
};

export default UserItem;
