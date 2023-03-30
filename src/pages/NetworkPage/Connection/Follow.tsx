import React from 'react';
import FollowItem from './FollowItem';

const Follow = () => {
  const listFriend = [1, 2, 3,4,5,6,7,8,9,10];
  return (
    <div className='bg-[#444444] w-full'>
      {/* <div>follow</div> */}
      {listFriend.map((item) => (
        <div key={item}>
          <FollowItem />
        </div>
      ))}
    </div>
  );
};

export default Follow;