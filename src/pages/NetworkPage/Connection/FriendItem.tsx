import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

const FriendItem = () => {
  const {Text} = Typography;

  return (
    <div className='p-6 m-2 bg-[#D6EAF8]'>
      <Row>
        <Col span={18}>
          <Row>
            <Col span={2}>
              <div className='friend-img'>
              <img src="https://d1hjkbq40fs2x4.cloudfront.net/2016-01-31/files/1045-1.jpg" alt="" />
              </div>
            </Col>
            <Col span={22} className='friend-text'>
              <Text>Nguyen Quang Huy</Text>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Button>
            Unfriend
          </Button>
        </Col>
      </Row>
      
    </div>
  )
};

export default FriendItem;
