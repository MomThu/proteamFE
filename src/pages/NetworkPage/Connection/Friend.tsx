import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { actionGetFriend } from 'redux/network/actions';
import { selectorFriends } from 'redux/network/selectors';
import FriendItem from './FriendItem';

const Friend = () => {
  const dispatch = useAppDispatch();

  const friends = useAppSelector(selectorFriends);

  useEffect(() => {
    dispatch(actionGetFriend()).unwrap();
  }, [dispatch]);
  
  return (
    <div className='w-full'>
      {friends.map((item) => (
        <div key={item.account_id}>
          <FriendItem data={item} />
        </div>
      ))}
    </div>
  );
};

export default Friend;
