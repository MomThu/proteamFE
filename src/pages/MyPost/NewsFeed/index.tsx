import { Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { actionGetAllPosts } from 'redux/post/actions';
import { selectorAllPosts } from 'redux/post/selectors';
import PostComponent from './PostComponent';

const {Title} = Typography;

const NewsFeed: React.FC = () => {
  const dispatch = useAppDispatch();

  const listPosts = useAppSelector(selectorAllPosts);

  useEffect(() => {
    dispatch(actionGetAllPosts()).unwrap();
  }, [dispatch]);

  return (
    <div>
      <div>
        <Title>My post</Title>
      </div>
      {listPosts.map((item, index) => {
        return (
          <div key={index}>
            <PostComponent data={item} />
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;
