import React from 'react';
import FriendItem from './FriendItem';

const Friend = () => {
  const listFriend = [1, 2, 3];
  return (
    <div className='bg-[#444444] w-full'>
      <div>friend</div>
      {listFriend.map((item) => (
        <div key={item}>
          <FriendItem />
        </div>
      ))}
    </div>
  );
};

export default Friend;
