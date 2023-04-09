import { CaretDownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Modal, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import routesMap from 'layouts/routesMap';
import { isEmpty } from 'lodash';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { FaUser, FaUserEdit } from 'react-icons/fa';
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

  const gotoProfile = useCallback((): void => {
    navigate(routesMap.PROFILE);
  }, [navigate]);

  const gotoPost = useCallback((): void => {
    navigate(routesMap.MYPOST);
  }, [navigate]);

  const gotoResetPassword = useCallback((): void => {
    navigate(routesMap.CHANGE_PASSWORD);
  }, [navigate]);

  const items = useMemo(
    (): MenuItem[] => [
      getItem(
        'dropdown-profile',
        <Text className="font-medium hover:text-primary" onClick={gotoProfile}>
          <FaUser className="mr-2" />
          Manage Your Profile
        </Text>
      ),
      getItem(
        'dropdown-post',
        <Text className="font-medium hover:text-primary" onClick={gotoPost}>
          <FaUser className="mr-2" />
          Manage Your Post
        </Text>
      ),
      getItem(
        'dropdown-change-password',
        <Text className="font-medium hover:text-primary" onClick={gotoResetPassword}>
          <FaUserEdit className="mr-2" />
          Change Password
        </Text>
      ),
      getItem(
        'dropdown-logout',
        <Text className="font-medium hover:text-primary" onClick={handleLogout}>
          <LogoutOutlined className="mr-2" />
          Logout
        </Text>
      ),
    ],
    [gotoProfile, gotoResetPassword, handleLogout, gotoPost]
  );

  return (
    <>
      {/* <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" /> */}
      <Dropdown menu={{ items }} placement="bottomRight">
        <Text className="text-sm cursor-pointer flex min-w-[150px] gap-3">
          {`${user?.name}`}
          <CaretDownOutlined className="ml-2" />
        </Text>
      </Dropdown>
    </>
  );
};

export default memo(InfoSystem);
