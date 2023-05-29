import { Image, Input, Menu, MenuProps, Space } from 'antd';
import { getRealPath } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { isEmpty, map } from 'lodash';
import logo from 'assets/image/logo_3.png';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'app/hooks';
import { actionSearchUser } from 'redux/network/actions';
import { notificationError } from 'utils/notifications';
import { getMessageError } from 'utils/common';
import { PAGE_SIZE } from 'utils/constants';
import { useNavs } from '../useNavs';
import { useRoutes } from '../useRoutes';

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

const AppSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navs = useNavs();
  const routes = useRoutes();
  const location = useLocation();

  const [selectedKeys, setSelectedKeys] = useState<string[] | undefined>();
  const [openKeys, setOpenKeys] = useState<string[] | undefined>();

  useEffect(() => {
    const pathNames = location.pathname.split('/').filter((x) => x);

    if (pathNames.length) {
      const pathName = `/${pathNames.join('/')}`;
      const findRoute = routes.find((route) => {
        return route.path !== routesMap.HOME && pathName.indexOf(getRealPath(route.path)) !== -1;
      });

      if (findRoute) {
        setOpenKeys(findRoute.openKey);
        setSelectedKeys(findRoute.activeKey);
      }
    }

    if (location.pathname === routesMap.HOME) {
      setSelectedKeys([routesMap.HOME]);
    }
  }, [location.pathname, routes]);

  const items = useMemo((): MenuItem[] => {
    const items: MenuItem[] = [];

    navs.forEach((nav) => {
      const Icon = nav.icon ? <nav.icon size={20} /> : undefined;

      if (isEmpty(nav.items)) {
        items.push(getItem(nav.key, <Link to={nav.key}>{nav.name}</Link>, Icon));
      } else {
        const itemsChild1 = map(nav.items, (nav1) => {
          return getItem(nav1.key, <Link to={nav1.key}>{nav1.name}</Link>);
        });

        items.push(getItem(nav.key, nav.name, Icon, itemsChild1));
      }
    });

    return items;
  }, [navs]);

  const onSearch = async (value: string) => {
    const payload = {
      name: value,
      limit: PAGE_SIZE,
      page_number: 0,
    };
    try {
      await dispatch(actionSearchUser(payload)).unwrap();
      navigate(routesMap.USER, {
        state: {
          search: value,
        },
      });
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const renderLogo = (): JSX.Element => {
    return (
      <div className="sidebar-logo justify-evenly">
        {/* <Text className="flex-1 text-center text-white mb-0 text-base font-semibold"> */}
        <Image src={logo} alt="ghtm" preview={false} width={120} rootClassName="mr-3" />
        {/* </Text> */}
      </div>
    );
  };

  const renderMenu = (): JSX.Element => {
    return (
      <Menu
        mode="horizontal"
        // theme="dark"
        items={items}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        className="font-medium select-none"
        onSelect={(info): void => setSelectedKeys(info.selectedKeys)}
        onOpenChange={(keys): void => setOpenKeys(keys)}
      />
    );
  };

  return (
    <div className="flex flex-row w-[100%] h-[100%]">
      <div>{renderLogo()}</div>
      <div className="w-[100%]">
        <div className="object-contain">{renderMenu()}</div>
      </div>
      <div>
        <Space>
          <Input.Search placeholder="Search..." onSearch={onSearch} style={{ width: 200 }} />
        </Space>
      </div>
    </div>
  );
};

export default AppSidebar;
