/* eslint-disable @typescript-eslint/no-explicit-any */
import { Space, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { actionGetProfileSkills } from 'redux/profile/actions';
import { selectorProfileSkills } from 'redux/profile/selectors';

const { Title } = Typography;

const Skill = () => {
  const dispatch = useAppDispatch();

  const profileSkills = useAppSelector(selectorProfileSkills);

  useEffect(() => {
    dispatch(actionGetProfileSkills()).unwrap();
  }, [dispatch]);

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Title level={3} className="text-left">Skills</Title>
      </div>
      <Space direction="vertical">
        {profileSkills.map((item) => {
          return (
            <div key={item.skill_id}>
              <Title level={5}>- {item.skill_name}</Title>
            </div>
          );
        })}
      </Space>
    </div>
  );
};

export default Skill;
