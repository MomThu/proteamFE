import { Empty, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { actionGetAllPostsUser } from 'redux/post/actions';
import { selectorAllUserPosts } from 'redux/post/selectors';
import PostComponent from './PostComponent';
import Post from './Post';

const { Title } = Typography;

const MyPosts: React.FC = () => {
  const dispatch = useAppDispatch();

  const listPosts = useAppSelector(selectorAllUserPosts);

  useEffect(() => {
    dispatch(actionGetAllPostsUser()).unwrap();
  }, [dispatch]);

  const onReload = async () => {
    await dispatch(actionGetAllPostsUser()).unwrap();
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='w-[60%] m-10'>
        <Post onReload={onReload} />
      </div>
      <div className='w-[60%] m-10'>
        <div className='ml-10'>
          <Title level={4}>My post</Title>
        </div>
        {listPosts && listPosts.length ? (
          listPosts.map((item, index) => {
            return (
              <div key={index}>
                <PostComponent data={item} />
              </div>
            );
          })
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default MyPosts;
