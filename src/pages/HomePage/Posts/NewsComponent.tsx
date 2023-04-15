import { Card, Dropdown, MenuProps, Image, Typography, Avatar } from 'antd';
import moment from 'moment';
import React, { useMemo } from 'react';
import { MoreOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { TIME_FORMAT_6 } from 'utils/time';

const { Text, Link } = Typography;
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
const NewsComponent = (props: IProps) => {
  const items = useMemo(
    (): MenuItem[] => [
      getItem('dropdown-save', <Text className="font-medium hover:text-primary">Save this post</Text>),
      getItem('dropdown-report', <Text className="font-medium hover:text-primary">Report this post</Text>),
    ],
    []
  );

  const onCancel = () => {
    return;
  };

  return (
    <div className="m-10">
      <Card>
        <div className="flex flex-row justify-between">
          <div>
            <div className="flex flex-row">
              <div className="mr-5">
                {props.data?.avatar ? (
                  <Image
                    src={props.data?.avatar}
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
                <Link className="font-bold text-black" href={`/profile/user?${props.data?.account_id}`}>
                  {props.data?.name}
                </Link>
                <div className="font-thin text-xs">
                  {props.data?.create_time ? moment(props.data?.create_time).format(TIME_FORMAT_6) : ''}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Text>
                <MoreOutlined className="ml-2" />
              </Text>
            </Dropdown>
            <CloseOutlined className="ml-2" onClick={onCancel} />
          </div>
        </div>

        <div className='mt-5'>{props.data?.content}</div>

        <div className='mt-5'>
          {props.data?.image ? (
            <Image
              src={props.data?.image}
              alt="postImage"
              preview={false}
              width={300}
              className="shadow max-w-full h-auto border-none"
            />
          ) : null}
        </div>
      </Card>
    </div>
  );
};

export default NewsComponent;
