import { Image, Menu, MenuProps } from 'antd';
import { getRealPath } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { isEmpty, map } from 'lodash';
import logo from 'assets/image/PROTEAM_2.png';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  const renderLogo = (): JSX.Element => {
    return (
      <div className="sidebar-logo justify-evenly p-3">
        {/* <Text className="flex-1 text-center text-white mb-0 text-base font-semibold"> */}
        <Image src={logo} alt="ghtm" preview={false} width={100} rootClassName="mr-3" />
        {/* </Text> */}
      </div>
    )
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
    // <Sider
    //   width={230}
    //   theme="dark"
    //   breakpoint={'xl'}
    //   className="menu-sidebar"
    //   collapsedWidth={55}
    //   trigger={null}
    //   collapsible
    //   collapsed={collapsed}
    //   onBreakpoint={(broken): void => {
    //     setCollapsed(broken);
    //   }}
    // >
    //   {renderLogo()}
    //   {renderMenu()}
    // </Sider>
    <div className='flex flex-row w-[100%] h-[100%]'>
      <div>
        {renderLogo()}
      </div>
      <div className='w-[100%]'>
        <div className='object-contain'>
          {renderMenu()}
        </div>
      </div>


    </div>
  );
};

export default AppSidebar;
