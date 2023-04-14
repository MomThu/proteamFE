import { Dropdown, Empty, MenuProps, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { FunnelPlotOutlined } from '@ant-design/icons';
import { actionGetAllPosts } from 'redux/post/actions';
import { selectorAllNews } from 'redux/post/selectors';
import NewsComponent from './NewsComponent';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Item 1',
  },
  {
    key: '2',
    label: 'Item 2',
  },
  {
    key: '3',
    label: 'Item 3',
  },
];

const News = () => {
  const dispatch = useAppDispatch();

  const listNews = useAppSelector(selectorAllNews);

  useEffect(() => {
    dispatch(actionGetAllPosts()).unwrap();
  }, [dispatch]);

  if (!listNews || listNews.length === 0) {
    return <Empty />;
  } else
    return (
      <div>
        <div>
          <Dropdown
            menu={{
              items,
              selectable: true,
              defaultSelectedKeys: ['3'],
            }}
          >
            <Typography.Link>
              <Space>
                Filter
                <FunnelPlotOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        </div>
        {listNews &&
          listNews.length &&
          listNews.map((item, index) => {
            return (
              <div key={index}>
                <NewsComponent data={item} />
              </div>
            );
          })}
      </div>
    );
};

export default News;
