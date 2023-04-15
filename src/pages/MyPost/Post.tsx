import { Avatar, Button, Card, Col, Modal, Row, Tooltip, Typography, Image } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { UserOutlined } from '@ant-design/icons';
import { actionCreatePost, actionGetAllPosts } from 'redux/post/actions';
import { notificationError, notificationSuccess } from 'utils/notifications';
import UploadImage from 'components/base/UpLoad/UploadImage';
import { actionGetProfile } from 'redux/profile/actions';
import { selectorProfile } from 'redux/profile/selectors';

const { Text } = Typography;
const Post: React.FC = () => {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(selectorProfile);

  const [isOpenModalCreatePost, setIsOpenModalCreatePost] = useState(false);
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    dispatch(actionGetProfile()).unwrap();
  }, [dispatch]);

  const openCloseModalCreatePost = () => {
    setIsOpenModalCreatePost(!isOpenModalCreatePost);
  };

  const handleCancel = () => {
    setValue('');
    setImage('');
    setIsOpenModalCreatePost(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        content: value,
        skills: [],
        min_gpa: 0,
        max_gpa: 4,
        image: image,
      };
      await dispatch(actionCreatePost(payload)).unwrap();
      notificationSuccess('Post successful!');
      dispatch(actionGetAllPosts()).unwrap();
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
          <Button type="primary" onClick={handleSave} disabled={value || image ? false : true}>
            Post
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default Post;
