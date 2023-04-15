import { Empty, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { actionGetAllPostsUser } from 'redux/post/actions';
import { selectorAllUserPosts } from 'redux/post/selectors';
import PostComponent from './PostComponent';

const {Title} = Typography;

const NewsFeed: React.FC = () => {
  const dispatch = useAppDispatch();

  const listPosts = useAppSelector(selectorAllUserPosts);

  useEffect(() => {
    dispatch(actionGetAllPostsUser()).unwrap();
  }, [dispatch]);

  return (
    <div>
      <div>
        <Title level={2}>My post</Title>
      </div>
      {listPosts && listPosts.length ? listPosts.map((item, index) => {
        return (
          <div key={index}>
            <PostComponent data={item} />
          </div>
        );
      }) : <Empty />}
    </div>
  );
};

export default NewsFeed;
