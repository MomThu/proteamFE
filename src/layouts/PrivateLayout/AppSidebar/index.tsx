/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Image, Input, InputNumber, Menu, MenuProps, Modal, Space, Typography } from 'antd';
import { getRealPath } from 'layouts/helper';
import routesMap from 'layouts/routesMap';
import { get, isEmpty, map } from 'lodash';
import logo from 'assets/image/logo_3.png';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionSearchUser } from 'redux/network/actions';
import { notificationError } from 'utils/notifications';
import { actionGetSkills } from 'redux/profile/actions';
import { selectorSkills } from 'redux/profile/selectors';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
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
const { Text } = Typography;
const AppSidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navs = useNavs();
  const routes = useRoutes();
  const location = useLocation();

  const skills = useAppSelector(selectorSkills);

  const [selectedKeys, setSelectedKeys] = useState<string[] | undefined>();
  const [openKeys, setOpenKeys] = useState<string[] | undefined>();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [optionSkills, setOptionSkills] = useState<any>([]);
  const [skillSelected, setSkillSelected] = useState<CheckboxValueType[]>([]);
  const [inputMinGPA, setInputMinGPA] = useState(0);
  const [inputMaxGPA, setInputMaxGPA] = useState(4);
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');

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

  useEffect(() => {
    dispatch(actionGetSkills()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    const optionSkill = skills.map((item) => {
      return {
        label: get(item, 'skill_name', ''),
        value: get(item, 'skill_id', ''),
      };
    });
    setOptionSkills(optionSkill);
  }, [skills]);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
    setSkillSelected([]);
    setInputMinGPA(0);
    setInputMaxGPA(4);
    setName('');
    setSchool('');
    setMajor('');
  };

  const openModal = <Button onClick={handleOpenModal}>Filter Users</Button>;

  const handleSave = async () => {
    if (inputMinGPA > inputMaxGPA) {
      notificationError('Max GPA must greater than min GPA');
    } else {
      try {
        const payload = {
          name: name,
          skills: skillSelected,
          school: school,
          major: major,
          min_gpa: inputMinGPA,
          max_gpa: inputMaxGPA,
          limit: PAGE_SIZE,
          page_number: 0,
        };
        await dispatch(actionSearchUser(payload)).unwrap();
        navigate(routesMap.USER, {
          state: payload,
        });
      } catch (error) {
        notificationError(getMessageError(error));
      }
      setIsOpenModal(false);
      setSkillSelected([]);
      setInputMinGPA(0);
      setInputMaxGPA(4);
      setName('');
      setSchool('');
      setMajor('');
    }
  };

  const onChangeSkill = (checkedValues: CheckboxValueType[]) => {
    setSkillSelected(checkedValues);
  };

  const renderLogo = (): JSX.Element => {
    return (
      <div className="sidebar-logo justify-evenly">
        <Image src={logo} alt="ghtm" preview={false} width={120} rootClassName="mr-3" />
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
      <div className="flex justify-center items-center">
        <Space>
          {openModal}
        </Space>
      </div>
      <Modal
        open={isOpenModal}
        title="Search users by: "
        onCancel={handleOpenModal}
        destroyOnClose={true}
        footer={null}
      >
        <div>
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input placeholder="School" value={school} onChange={(e) => setSchool(e.target.value)} />
          <Input placeholder="Major" value={major} onChange={(e) => setMajor(e.target.value)} />

          <Text>Select skills</Text>
          <Checkbox.Group className="flex flex-wrap" options={optionSkills} onChange={onChangeSkill} />
          <div>
            <Text>GPA</Text>
          </div>
          <Input.Group compact className="mb-5">
            <InputNumber
              style={{ width: 100, textAlign: 'center' }}
              placeholder="Minimum"
              min={0}
              max={4}
              step={0.01}
              onChange={(value) => setInputMinGPA(value || 0)}
              value={inputMinGPA}
            />
            <Input
              className="site-input-split"
              style={{
                width: 30,
                borderLeft: 0,
                borderRight: 0,
                pointerEvents: 'none',
              }}
              placeholder="~"
              disabled
            />
            <InputNumber
              className="site-input-right"
              style={{
                width: 100,
                textAlign: 'center',
              }}
              placeholder="Maximum"
              min={0}
              max={4}
              step={0.01}
              onChange={(value) => setInputMaxGPA(value || 4)}
              value={inputMaxGPA}
            />
          </Input.Group>
          <Button type="primary" onClick={handleSave}>
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AppSidebar;
