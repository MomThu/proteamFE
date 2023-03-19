import { CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import routesMap from 'layouts/routesMap';
import { isEmpty } from 'lodash';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { actionAuthLogout } from 'redux/auth/actions';
import { selectorUserInfo } from 'redux/auth/selectors';

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectorUserInfo);

  const [user, setUser] = useState<UserInfo>({});

  useEffect(() => {
    if (!isEmpty(userInfo)) {
      setUser(userInfo);
    } else {
      setUser({});
    }
  }, [userInfo]);

  const handleLogout = useCallback((): void => {
    Modal.confirm({
      title: 'Xác nhận',
      okText: 'Đồng ý',
      autoFocusButton: null,
      content: 'Bạn có chắc muốn đăng xuất ?',
      onOk: async () => {
        await dispatch(actionAuthLogout()).unwrap();
        navigate(routesMap.LOGIN);
      },
    });
  }, [navigate, dispatch]);

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
        {`${user?.firstName} ${user?.lastName}`}
        <CaretDownOutlined className="ml-2" />
      </Text>
    </Dropdown>
  );
};

export default memo(InfoSystem);
