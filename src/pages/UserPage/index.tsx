import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from 'react-router-dom';
import { selectorMoreSearchUsers, selectorSearchUsers } from 'redux/network/selectors';
import { actionSearchUser } from 'redux/network/actions';
import { Empty } from 'antd';
import UserItem from './UserItem';

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { state } = useLocation();

  const listUser = useAppSelector(selectorSearchUsers);
  const hasMore = useAppSelector(selectorMoreSearchUsers);

  const [page, setPage] = useState(0);
  const [users, setUsers] = useState<User.Profile[]>([]);

  useEffect(() => {
    const payload = {
      limit: 10,
      page_number: 0,
      name: state.search
    };
    dispatch(actionSearchUser(payload)).unwrap();
    setUsers(listUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.search]);

  const fetchUsers = () => {
    const payload = {
      limit: 10,
      page_number: page + 10,
      name: state.search
    };
    setPage((prevState) => prevState + 10);
    setTimeout(async () => {
      if (listUser && listUser.length) {
        const response = await dispatch(actionSearchUser(payload)).unwrap();
        const listUsers = users.concat(response);
        setUsers(listUsers);
      }
    }, 1000);
  };

  // const fetchUsers = () => {
  //   const payload = {
  //     limit: 10,
  //     page_number: page + 10,
  //     name: state.search
  //   };
  //   setPage((prevState) => prevState + 10);
  //   setTimeout(() => {
  //     if (hasMore) {
  //       dispatch(actionSearchUser(payload)).unwrap();
  //     }
  //   }, 1000);
  // };
  const onReload = () => {
    // dispatch(actionSearchUser()).unwrap();
  };

  if (users && users.length) {
    return (
      <InfiniteScroll
        dataLength={users.length}
        next={fetchUsers}
        hasMore={hasMore}
        loader={<h4>Loading ...</h4>}
      >
        {
          users.map((item) => {
            return (
              <div key={item.account_id}>
                <UserItem data={item} onReload={onReload} />
              </div>
            )
          })
        }
      </InfiniteScroll>
    );
  }
  return <Empty />;
};

export default UserPage;
