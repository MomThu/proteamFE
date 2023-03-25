import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

const FriendItem = () => {
  const {Text} = Typography;

  return (
    <div className='p-6 m-2 bg-[#D6EAF8]'>
      <Row>
        <Col span={18}>
          <Text>Nguyen Quang Huy</Text>
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
