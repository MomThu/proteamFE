import React from 'react';
import GroupsItem from './GroupsItem';

const Groups = () => {
  const listFriend = [1, 2, 3,4,5,6,7,8,9,10];
  return (
    <div className='bg-[#444444] w-full'>
      {/* <div>follow</div> */}
      {listFriend.map((item) => (
        <div key={item}>
          <GroupsItem />
        </div>
      ))}
    </div>
  );
};

export default Groups;