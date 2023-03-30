import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

const FollowItem = () => {
  const {Text} = Typography;

  return (
    <div className='p-6 m-2 bg-[#D6EAF8]'>
      <Row>
        <Col span={18}>
          <Row>
            <Col span={2}>
              <div className='friend-img'>
              <img src="data:image/jpeg;base64,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" alt="" />
              </div>
            </Col>
            <Col span={22} className='friend-text'>
              <Text>Nguyen Văn A</Text>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Button>
            Un Follow
          </Button>
        </Col>
      </Row>
      
    </div>
  )
};

export default FollowItem;
