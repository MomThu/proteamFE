import { TabPaneProps } from 'antd';
import { Moment } from 'moment';

export type RangeDateValue = [Moment | null, Moment | null];

export interface TabPaneItem extends Omit<TabPaneProps, 'tab'> {
  key: string;
  label: React.ReactNode;
}
