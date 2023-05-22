import { Card, Image, Typography, Avatar } from 'antd';
import moment from 'moment';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { TIME_FORMAT_6 } from 'utils/time';
import verified from 'assets/image/ic_verified.png';

const { Link } = Typography;
interface IProps {
  data?: Post.Post;
}
const NewsComponent = (props: IProps) => {
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
                <div className='flex flex-row'>
                  <Link className="font-bold text-black" href={`/profile/user?${props.data?.account_id}`}>
                    {props.data?.name}
                    {props.data?.role === 2 && (
                      <Image src={verified} alt="verified" preview={false} className="justify-items-center" />
                    )}
                  </Link>
                </div>
                <div className="font-thin text-xs">
                  {props.data?.create_time ? moment(props.data?.create_time).format(TIME_FORMAT_6) : ''}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5">{props.data?.content}</div>

        <div className="mt-5">
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
