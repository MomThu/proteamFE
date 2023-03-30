/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Checkbox, Divider, Modal, Space, Typography } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { actionGetProfileSkills, actionGetSkills, actionUpdateProfileSkills } from 'redux/profile/actions';
import { selectorProfileSkills, selectorSkills } from 'redux/profile/selectors';
import { getMessageError } from 'utils/common';
import { notificationError, notificationSuccess } from 'utils/notifications';

const { Title } = Typography;

const Skill = () => {
  const dispatch = useAppDispatch();

  const profileSkills = useAppSelector(selectorProfileSkills);
  const skills = useAppSelector(selectorSkills);

  const [openModal, setOpenModal] = useState(false);
  const [skillSelected, setSkillSelected] = useState<CheckboxValueType[]>([]);
  const [optionSkills, setOptionSkills] = useState<any>([]);
  const [optionProfileSkills, setOptionProfileSkills] = useState<any>([]);

  useEffect(() => {
    dispatch(actionGetProfileSkills()).unwrap();
    dispatch(actionGetSkills()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    const optionProfileSkill: any = profileSkills.map((item) => get(item, 'skill_skill_id', ''));
    setOptionProfileSkills(optionProfileSkill);

    const optionSkill = skills.map((item) => {
      return {
        label: get(item, 'skill_name', ''),
        value: get(item, 'skill_id', ''),
      };
    });
    setOptionSkills(optionSkill);
  }, [profileSkills, skills]);

  const handleSelectSkills = async () => {
    await dispatch(actionGetProfileSkills()).unwrap();
    setOpenModal(true);
  };

  const handleCancel = async () => {
    setSkillSelected([]);
    setOpenModal(false);
  };

  const onChangeSkill = (checkedValues: CheckboxValueType[]) => {
    setSkillSelected(checkedValues);
    setOptionProfileSkills(checkedValues);
  };

  const onFinish = async () => {
    if (skillSelected && skillSelected.length) {
      const payload = {
        skills: skillSelected,
      };
      try {
        await dispatch(actionUpdateProfileSkills(payload)).unwrap();
        notificationSuccess('Information Update Successful!');
        setOpenModal(false);
        dispatch(actionGetProfileSkills()).unwrap();
      } catch (error) {
        notificationError(getMessageError(error));
      }
    } else {
      notificationError('Please select your skills!');
    }
  };

  return (
    <div>
      <Card className="mt-10">
        <div className="flex flex-row justify-between">
          <Title className="text-left">Skills</Title>
          {profileSkills && profileSkills.length ? (
            <div>
              <Button onClick={handleSelectSkills}>Update Skills</Button>
            </div>
          ) : (
            <div>
              <Button onClick={handleSelectSkills}>Add Skills</Button>
            </div>
          )}
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
        <Modal
          title="Select Skills"
          open={openModal}
          onOk={onFinish}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
          destroyOnClose={true}
        >
          <Checkbox.Group
            className="flex flex-wrap"
            options={optionSkills}
            defaultValue={optionProfileSkills}
            onChange={onChangeSkill}
          />
        </Modal>
      </Card>
    </div>
  );
};

export default Skill;
