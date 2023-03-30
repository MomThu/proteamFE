import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

const GroupsItem = () => {
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
              <Text>Nhóm CODE chuyên BE</Text>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
            <Button type="primary">OUT</Button>
        </Col>
      </Row>
      
    </div>
  )
};

export default GroupsItem;
