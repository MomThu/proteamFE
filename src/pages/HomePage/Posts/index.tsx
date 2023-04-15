/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Checkbox, Col, Empty, Modal, Row, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { actionFilterPost, actionGetAllPosts } from 'redux/post/actions';
import { selectorFilterPosts } from 'redux/post/selectors';
import Post from 'pages/MyPost/Post';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { notificationError } from 'utils/notifications';
import { selectorSkills } from 'redux/profile/selectors';
import { actionGetSkills } from 'redux/profile/actions';
import { get } from 'lodash';
import { getMessageError } from 'utils/common';
import NewsComponent from './NewsComponent';
import ConnectComponent from './ConnectComponent';

const { Text } = Typography;
const News = () => {
  const dispatch = useAppDispatch();

  const listNews = useAppSelector(selectorFilterPosts);
  const skills = useAppSelector(selectorSkills);

  const [openModalFilter, setOpenModalFilter] = useState(false);
  const [skillSelected, setSkillSelected] = useState<CheckboxValueType[]>([]);
  const [optionSkills, setOptionSkills] = useState<any>([]);
  const [optionProfileSkills, setOptionProfileSkills] = useState<any>([]);

  useEffect(() => {
    // dispatch(actionGetAllPosts()).unwrap();
    const payload = {
      
    };
    dispatch(actionFilterPost(payload)).unwrap();
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

  const onReload = async () => {
    await dispatch(actionGetAllPosts()).unwrap();
  };

  const openCloseModalFilter = () => {
    setOptionProfileSkills([])
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

  if (!listNews || listNews.length === 0) {
    return <Empty />;
  } else
    return (
      <div>
        <Row gutter={16}>
          <Col span={18}>
            <div className="m-10">
              <Post onReload={onReload} />
            </div>
            <div className="mx-10 flex justify-between">
              <div></div>
              <Button icon={<FilterOutlined />} onClick={openCloseModalFilter}>
                Filter
              </Button>
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
