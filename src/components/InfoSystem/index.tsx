import { CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Modal, Typography } from 'antd';
import routesMap from 'layouts/routesMap';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;
type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  key: React.Key,
  label: React.ReactNode,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return { key, icon, children, label, type } as MenuItem;
};

const InfoSystem: React.FC = () => {
  const natigate = useNavigate();


  const [user, setUser] = useState<{full_name: string}>({full_name: ''});

  useEffect(() => {
    const userInfo = {
      full_name: 'Nguyen Van Dev',
    }
    setUser(userInfo);
  }, []);

  const handleLogout = useCallback((): void => {
    Modal.confirm({
      title: 'Xác nhận',
      okText: 'Đồng ý',
      autoFocusButton: null,
      content: 'Bạn có chắc muốn đăng xuất ?',
      onOk: () => {
        natigate(routesMap.LOGIN);
      },
    });
  }, [natigate]);

  const items = useMemo(
    (): MenuItem[] => [
      getItem(
        'dropdown-logout',
        <Text className="font-medium hover:text-primary" onClick={handleLogout}>
          <LogoutOutlined className="mr-2" />
          Đăng xuất
        </Text>
      ),
    ],
    [handleLogout]
  );

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      {/* <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" src={'https://i.pravatar.cc/100'} /> */}
      <Text className="text-sm cursor-pointer">
        {user?.full_name}
        <CaretDownOutlined className="ml-2" />
      </Text>
    </Dropdown>
  );
};

export default memo(InfoSystem);
