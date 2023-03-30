import React, { useState } from 'react';
import { GroupOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { FaHashtag, FaInvision } from 'react-icons/fa';

import Friend from './Connection/Friend';
import Follow from './Connection/Follow';
import Received from './Invitation/Received';
import Sent from './Invitation/Sent';
import Groups from './Groupss/Groups';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Connection', 'sub1', <UserOutlined />, [getItem('List Friends', '1'), getItem('Follower', '2')]),
  getItem('Invitation', 'sub2', <FaInvision />, [getItem('Received', '3'), getItem('Sent', '4')]),
  getItem('Groups', 'sub3', <GroupOutlined />, [getItem('Groups', '5')]),
  getItem('Hashtags', 'sub4', <FaHashtag />, [getItem('Hashtags', '6')]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4'];

const NetworkPage: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [current, setCurrent] = useState('1');

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    // console.log(keys, 'key');

    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    // console.log(latestOpenKey, 'latestOpenKey');

    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className='flex'>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        onClick={onClick}
        style={{ width: 256 }}
        items={items}
        selectedKeys={[current]}
      />
      <div className='w-full'>{
        current === '1' ? <Friend /> : 
        current === '2' ? <Follow /> :
        current === '3' ? <Received /> : 
        current === '4' ? <Sent /> :
        current === '5' ? <Groups /> :
        null
        }
      </div>
    </div>
  );
};

export default NetworkPage;
