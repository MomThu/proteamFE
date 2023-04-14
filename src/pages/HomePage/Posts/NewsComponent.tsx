import { Card, Dropdown, MenuProps, Image, Typography } from 'antd';
import moment from 'moment';
import React, { useMemo } from 'react';
import { MoreOutlined, CloseOutlined } from '@ant-design/icons';
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
const NewsComponent = (props: IProps) => {
  const items = useMemo(
    (): MenuItem[] => [
      getItem('dropdown-save', <Text className="font-medium hover:text-primary">Save this post</Text>),
      getItem('dropdown-report', <Text className="font-medium hover:text-primary">Report this post</Text>),
    ],
    []
  );

  const onCancel = () => {
    console.log("cancel item")
  }

  return (
    <div className="m-10">
      <Card className="w-[60%]">
        <div className="flex flex-row justify-between">
          <div>
            <div className="font-bold">{props.data?.user_name}</div>
            <div className="font-thin text-xs">
              {props.data?.create_time ? moment(props.data?.create_time).format(TIME_FORMAT_6) : ''}
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

        <div>{props.data?.content}</div>
        <div>
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
