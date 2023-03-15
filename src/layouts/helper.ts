/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IconType } from 'react-icons';

export type AppRouteType = {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  rule: string | -1; // -1: mặc định là có, string: ăn theo UrlAction
  openKey: string[]; // openKey của Menu Sider
  activeKey: string[]; //selectedKey của Menu Sider
};

export type NavLinkItem = {
  name: string;
  key: string;
  icon?: IconType;
  items?: NavLinkItem[];
};

export const delayLazyLoad = <T extends React.ComponentType<any>>(
  componentLazy: Promise<{ default: T }>,
  time = 200
): Promise<{ default: T }> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(componentLazy), time);
  });
};

export const getRealPath = (path: string): string => {
  const paths = path.split('/').filter((p) => !p.includes(':'));
  return paths.join('/');
};
