/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Col, Empty, Input, Modal, Row, Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { actionFilterPost } from 'redux/post/actions';
import { selectorFilterPosts, selectorMoreSearchPosts } from 'redux/post/selectors';
import Post from 'pages/MyPost/Post';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { notificationError } from 'utils/notifications';
import { selectorSkills } from 'redux/profile/selectors';
import { actionGetSkills } from 'redux/profile/actions';
import { get } from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMessageError } from 'utils/common';
import NewsComponent from './NewsComponent';
import ConnectComponent from './ConnectComponent';

const { Text } = Typography;
const News = () => {
  const dispatch = useAppDispatch();

  const listNews = useAppSelector(selectorFilterPosts);
  const skills = useAppSelector(selectorSkills);
  const hasMore = useAppSelector(selectorMoreSearchPosts);

  const [page, setPage] = useState(0);
  const [posts, setPosts] = useState<Post.Post[]>([]);
  const [search, setSearch] = useState("");
  const [openModalFilter, setOpenModalFilter] = useState(false);
  const [skillSelected, setSkillSelected] = useState<CheckboxValueType[]>([]);
  const [optionSkills, setOptionSkills] = useState<any>([]);
  const [optionProfileSkills, setOptionProfileSkills] = useState<any>([]);

  // useEffect(() => {
  //   // dispatch(actionGetAllPosts()).unwrap();
  //   const payload = {};
  //   dispatch(actionFilterPost(payload)).unwrap();
  //   dispatch(actionGetSkills()).unwrap();
  // }, [dispatch]);

  useEffect(() => {
    const payload = {
      limit: 10,
      page_number: 0,
      search: search && search.length ? search : null
    };
    dispatch(actionFilterPost(payload)).unwrap();
    dispatch(actionGetSkills()).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search]);

  useEffect(() => {
    setPosts(listNews);
  }, [listNews])

  const fetchPosts = () => {
    const payload = {
      limit: 10,
      page_number: page + 10,
      search: search && search.length ? search : null,
    };
    setPage((prevState) => prevState + 10);
    setTimeout(async () => {
      if (listNews && listNews.length) {
        const response = await dispatch(actionFilterPost(payload)).unwrap();
        const listPosts = posts.concat(response);
        setPosts(listPosts);
      }
    }, 1000);
  };

  useEffect(() => {
    const optionSkill = skills.map((item) => {
      return {
        label: get(item, 'skill_name', ''),
        value: get(item, 'skill_id', ''),
      };
    });
    setOptionSkills(optionSkill);
  }, [skills]);

  const onReload = async () => {
    const payload = {};
    await dispatch(actionFilterPost(payload)).unwrap();
  };

  const openCloseModalFilter = () => {
    setOptionProfileSkills([]);
    setOpenModalFilter(!openModalFilter);
  };

  const handleCancel = async () => {
    setSkillSelected([]);
    setOpenModalFilter(false);
  };

  const onChangeSkill = (checkedValues: CheckboxValueType[]) => {
    setSkillSelected(checkedValues);
    setOptionProfileSkills(checkedValues);
  };

  const onFinish = async () => {
    const payload = {
      skills: skillSelected,
    };
    try {
      await dispatch(actionFilterPost(payload)).unwrap();
      setOpenModalFilter(false);
    } catch (error) {
      notificationError(getMessageError(error));
    }
  };

  const onSearch = async (value: string) => {
    setSearch(value);
    // const payload = {
    //   content: value,
    // };
    // try {
    //   await dispatch(actionFilterPost(payload)).unwrap();
    // } catch (error) {
    //   notificationError(getMessageError(error));
    // }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <div className="m-10">
            <Post onReload={onReload} />
          </div>
          <div className="mx-10 flex justify-between">
            <Space>
              <Input.Search placeholder="Search..." onSearch={onSearch} style={{ width: 200 }} />
            </Space>
            <Button icon={<FilterOutlined />} onClick={openCloseModalFilter}>
              Filter
            </Button>
          </div>

          {posts && posts.length ? (
            <InfiniteScroll dataLength={posts.length} next={fetchPosts} hasMore={hasMore} loader={<h4>Loading ...</h4>}>
              {posts.map((item, index) => {
                return (
                  <div key={index}>
                    <NewsComponent data={item} />
                  </div>
                );
              })}
            </InfiniteScroll>
          ) : (
            <Empty />
          )}
        </Col>
        <Col span={6}>
          <ConnectComponent />
        </Col>

        <Modal
          open={openModalFilter}
          title="Filter post"
          onCancel={handleCancel}
          okText="Filter"
          cancelText="Cancel"
          onOk={onFinish}
          destroyOnClose={true}
        >
          <Text>Select skills</Text>
          <Checkbox.Group
            className="flex flex-wrap"
            options={optionSkills}
            defaultValue={optionProfileSkills}
            onChange={onChangeSkill}
          />
        </Modal>
      </Row>
    </div>
  );
};

export default News;
