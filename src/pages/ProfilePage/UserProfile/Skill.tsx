/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, Divider, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { actionGetProfileSkills, actionGetSkills, } from 'redux/profile/actions';
import { selectorProfileSkills } from 'redux/profile/selectors';

const { Title } = Typography;

const Skill = () => {
  const dispatch = useAppDispatch();

  const profileSkills = useAppSelector(selectorProfileSkills);

  useEffect(() => {
    dispatch(actionGetProfileSkills()).unwrap();
    dispatch(actionGetSkills()).unwrap();
  }, [dispatch]);

  return (
    <div>
      <Card className="mt-10">
        <div className="flex flex-row justify-between">
          <Title className="text-left">Skills</Title>
        </div>
        <Space direction="vertical" className="">
          {profileSkills.map((item) => {
            return (
              <div key={item.skill_skill_id}>
                <Title level={5}>{item.skill_skill_name}</Title>
                <Divider />
              </div>
            );
          })}
        </Space>
      </Card>
    </div>
  );
};

export default Skill;
