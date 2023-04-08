import React, { useCallback, useMemo } from 'react';
import { Card, Dropdown, MenuProps, notification, Typography } from 'antd';
import { CaretDownOutlined, MoreOutlined } from '@ant-design/icons';
import { actionDeletePost, actionGetAllPosts, actionUpdatePost } from 'redux/post/actions';
import { useAppDispatch } from 'app/hooks';
import { notificationError, notificationSuccess } from 'utils/notifications';

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

  // const onUpdatePost = async () => {
  //   try {
  //     const payload = {

  //     }
  //     await dispatch(actionUpdatePost(payload)).unwrap();
  //   } catch (error) {
  //     notificationError("Update failed!")
  //   }
  // };

  const onDeletePost = useCallback(async () => {
    try {
      const payload = {
        post_id: props.data?.post_id
      }
      await dispatch(actionDeletePost(payload)).unwrap();
      notificationSuccess("Delete successful!")
      dispatch(actionGetAllPosts()).unwrap();
    } catch (error) {
      notificationError("Delete failed!")
    }
  }, [dispatch, props.data?.post_id]);

  const items = useMemo(
    (): MenuItem[] => [
      getItem(
        'dropdown-update',
        <Text className="font-medium hover:text-primary">
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
    <div className='m-10'>
      <Card>
        <div className='flex flex-row justify-between'>
        <div>{props.data?.content}</div>
          <Dropdown menu={{ items }} placement="bottomRight">
            {/* <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" /> */}
            <Text className="text-sm cursor-pointer flex min-w-[150px] gap-3">
              <MoreOutlined className="ml-2" />
            </Text>
          </Dropdown>
        </div>
        
      </Card>
    </div>
  );
};

export default PostComponent;
