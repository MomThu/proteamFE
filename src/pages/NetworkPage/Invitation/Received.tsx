import React, { useEffect } from 'react';
import { actionGetRequestFriend } from 'redux/network/actions';
import { selectorRequests } from 'redux/network/selectors';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ReceivedItem from './ReceivedItem';

const Received = () => {
  const dispatch = useAppDispatch();

  const requestFriends = useAppSelector(selectorRequests);

  useEffect(() => {
    dispatch(actionGetRequestFriend()).unwrap();
  }, [dispatch]);

  const onReload = () => {
    dispatch(actionGetRequestFriend()).unwrap();
  };
  return (
    <div className="w-full">
      {requestFriends.map((item, index) => (
        <div key={index}>
          <ReceivedItem data={item} onReload={onReload} />
        </div>
      ))}
    </div>
  );
};

export default Received;
