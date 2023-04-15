/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, Button, Card, Col, Modal, Row, Tooltip, Typography, Image, Checkbox } from 'antd';
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
    setIsOpenModalCreatePost(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        content: value,
        skills: skillSelected,
        min_gpa: 0,
        max_gpa: 4,
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
      <Modal open={isOpenModalCreatePost} title="Create a post" onCancel={handleCancel} footer={null}>
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
              className="flex flex-wrap"
              options={optionSkills}
              defaultValue={optionProfileSkills}
              onChange={onChangeSkill}
            />
          <Button type="primary" onClick={handleSave} disabled={value || image ? false : true}>
            Post
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default Post;
