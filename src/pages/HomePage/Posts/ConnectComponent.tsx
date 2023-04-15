import { Avatar, Card, Image, Row, Typography } from 'antd';
import React, { useEffect } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionSearchUser } from 'redux/network/actions';
import { selectorSearchUsers } from 'redux/network/selectors';
import { selectorProfile } from 'redux/profile/selectors';
import { actionGetProfile } from 'redux/profile/actions';

const { Title, Link } = Typography;

const ConnectComponent = () => {
  const dispatch = useAppDispatch();

  const listUsers = useAppSelector(selectorSearchUsers);
  const userInfo = useAppSelector(selectorProfile);

  useEffect(() => {
    const payload = {
      limit: 10,
      page_number: 0,
    };
    dispatch(actionSearchUser(payload)).unwrap();
    dispatch(actionGetProfile()).unwrap();
  }, [dispatch]);

  return (
    <div className="my-10 fixed">
      <Card className="w-[100%]">
        <Title level={4}>Add to your connection</Title>
        {listUsers.map((item, index) => {
          if (userInfo?.account_id !== item?.account_id) {
            return (
              <Row className="flex flex-row my-5" key={index}>
                <div className="mr-5">
                  {item?.avatar ? (
                    <Image
                      src={item?.avatar}
                      alt="avatar"
                      preview={false}
                      width={40}
                      className="shadow rounded-full max-w-full h-auto border-none"
                    />
                  ) : (
                    <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" />
                  )}
                </div>
                <div>
                  <Link href={`/profile/user?${item?.account_id}`}>{item?.name}</Link>
                </div>
              </Row>
            );
          } else {
            return null;
          }
        })}
      </Card>
    </div>
  );
};

export default ConnectComponent;
