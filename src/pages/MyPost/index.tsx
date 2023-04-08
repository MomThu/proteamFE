import React from 'react';
import NewsFeed from './NewsFeed';
import Post from './Post';

const MyPosts: React.FC = () => {
  return (
    <div>
      <Post />
      <NewsFeed />
    </div>
  );
};

export default MyPosts;
