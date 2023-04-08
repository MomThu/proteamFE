import { Button, Card, Col, Modal, Row, Tooltip, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useAppDispatch } from 'app/hooks';
import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import { actionCreatePost, actionGetAllPosts } from 'redux/post/actions';
import { notificationError, notificationSuccess } from 'utils/notifications';

const { Text } = Typography;
const Post: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isOpenModalCreatePost, setIsOpenModalCreatePost] = useState(false);
  const [value, setValue] = useState('');

  const openCloseModalCreatePost = () => {
    setIsOpenModalCreatePost(!isOpenModalCreatePost);
  };

  const handleCancel = () => {
    setValue('');
    setIsOpenModalCreatePost(false);
  };

  const handleSave = async () => {
    try {
      const payload = {
        content: value,
        skills: [],
        min_gpa: 0,
        max_gpa:4,
      }
      await dispatch(actionCreatePost(payload)).unwrap();
      notificationSuccess("Post successful!");
      dispatch(actionGetAllPosts()).unwrap();
    } catch (error) {
      notificationError("Post Error")
    }
    setIsOpenModalCreatePost(false);
      setValue('');
  };

  const handleImage = () => {
    // console.log('image');
  };

  return (
    <Card>
      <div>
        <Row>
          <Col span={4}>
            <p>image</p>
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
                <FaImage fontSize={30} onClick={handleImage} />
              </Tooltip>
            </div>
          </div>
          <Button type='primary' onClick={handleSave} disabled={value ? false : true}>
            Post
          </Button>
        </div>
      </Modal>
    </Card>
  );
};

export default Post;
