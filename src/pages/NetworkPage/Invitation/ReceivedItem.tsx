import { Button, Col, Row, Typography } from 'antd';
import React from 'react';

const ReceivedItem = () => {
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
              <Text>Nguyen Thi Thu</Text>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Button type="primary">ACCEPT</Button>
          <Button>
            DELETE
          </Button>
        </Col>
      </Row>
      
    </div>
  )
};

export default ReceivedItem;