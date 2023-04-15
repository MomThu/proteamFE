import { Col, Dropdown, Empty, MenuProps, Row, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { FunnelPlotOutlined } from '@ant-design/icons';
import { actionGetAllPosts } from 'redux/post/actions';
import { selectorAllPosts } from 'redux/post/selectors';
import Post from 'pages/MyPost/Post';
import NewsComponent from './NewsComponent';
import ConnectComponent from './ConnectComponent';

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

  const listNews = useAppSelector(selectorAllPosts);

  useEffect(() => {
    dispatch(actionGetAllPosts()).unwrap();
  }, [dispatch]);

  if (!listNews || listNews.length === 0) {
    return <Empty />;
  } else
    return (
      <div>
        <Row gutter={16}>
          <Col span={18}>
            <div className="m-10">
              <Post />
            </div>
            <div className="m-10">
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
          </Col>
          <Col span={6}>
            <ConnectComponent />
          </Col>
        </Row>
      </div>
    );
};

export default News;
