/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Card, Col, Modal, Row, Tooltip, Typography, Image, Checkbox, InputNumber, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { UserOutlined } from '@ant-design/icons';
import { actionCreatePost } from 'redux/post/actions';
import { notificationError, notificationSuccess } from 'utils/notifications';
import UploadImage from 'components/base/UpLoad/UploadImage';
import { actionGetProfile, actionGetSkills } from 'redux/profile/actions';
import { selectorProfile, selectorSkills } from 'redux/profile/selectors';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { get } from 'lodash';

interface IProps {
  onReload: () => void;
}
const { Text } = Typography;

const Post = (props: IProps) => {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(selectorProfile);
  const skills = useAppSelector(selectorSkills);

  const [isOpenModalCreatePost, setIsOpenModalCreatePost] = useState(false);
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const [skillSelected, setSkillSelected] = useState<CheckboxValueType[]>([]);
  const [optionSkills, setOptionSkills] = useState<any>([]);
  const [optionProfileSkills, setOptionProfileSkills] = useState<any>([]);
  const [inputMinGPA, setInputMinGPA] = useState(0);
  const [inputMaxGPA, setInputMaxGPA] = useState(4);

  useEffect(() => {
    dispatch(actionGetProfile()).unwrap();
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

  const openCloseModalCreatePost = () => {
    setOptionProfileSkills([]);
    setIsOpenModalCreatePost(!isOpenModalCreatePost);
  };

  const onChangeSkill = (checkedValues: CheckboxValueType[]) => {
    setSkillSelected(checkedValues);
    setOptionProfileSkills(checkedValues);
  };

  const handleCancel = () => {
    setValue('');
    setImage('');
    setSkillSelected([]);
    setInputMinGPA(0);
    setInputMaxGPA(4);
    setIsOpenModalCreatePost(false);
  };

  const handleSave = async () => {
    if (inputMinGPA > inputMaxGPA) {
      notificationError('Max GPA must greater than min GPA');
    } else {
      try {
        const payload = {
          content: value,
          skills: skillSelected,
          min_gpa: inputMinGPA,
          max_gpa: inputMaxGPA,
          image: image,
        };
        await dispatch(actionCreatePost(payload)).unwrap();
        notificationSuccess('Post successful!');
        props?.onReload();
      } catch (error) {
        notificationError('Post Error');
      }
      setIsOpenModalCreatePost(false);
      setValue('');
      setImage('');
      setSkillSelected([]);
      setInputMinGPA(0);
      setInputMaxGPA(4);
    }
  };

  const handleUploadSuccess = async (id: number, url: string) => {
    setImage(url);
  };

  return (
    <Card>
      <div>
        <Row>
          {/* <Col span={4}>
            <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" />
          </Col> */}
          <Col span={4}>
            {userInfo?.avatar ? (
              <Image
                src={userInfo?.avatar}
                alt="avatar"
                preview={false}
                width={40}
                className="shadow rounded-full max-w-full h-auto border-none"
              />
            ) : (
              <Avatar size={40} icon={<UserOutlined />} className="mr-3 cursor-pointer" />
            )}
          </Col>
          <Col span={18}>
            <Button className="bg-gray-200 w-[100%]" shape="round" onClick={openCloseModalCreatePost}>
              <Text className="text-gray-800">Start a post</Text>
            </Button>
          </Col>
        </Row>
      </div>
      <Modal
        open={isOpenModalCreatePost}
        title="Create a post"
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <TextArea
            placeholder="What do you want to talk about?"
            autoSize={{ minRows: 4, maxRows: 6 }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="flex justify-between">
            <p>Insert to your post</p>
            <div>
              <Tooltip placement="top" title={'Image/Video'}>
                <UploadImage path="post" onSuccess={handleUploadSuccess} icon={<FaImage fontSize={30} />} />
              </Tooltip>
            </div>
          </div>
          <Text>Select skills</Text>
          <Checkbox.Group
            className="grid grid-cols-3 gap-3 [&>*:first-child]:ml-2"
            options={optionSkills}
            defaultValue={optionProfileSkills}
            onChange={onChangeSkill}
          />
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
          <Button type="primary" onClick={handleSave} disabled={value || image ? false : true}>
            Post
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default Post;
