import { Button, Card, Col, Divider, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

const Skill = () => {
  const skillFake = [
    {
      id: 1,
      name: 'Reactjs'
    },
    {
      id: 2,
      name: 'Reactjs'
    },
    {
      id: 3,
      name: 'Reactjs'
    },
    {
      id: 4,
      name: 'Reactjs'
    },
    {
      id: 5,
      name: 'Reactjs'
    },
    {
      id: 6,
      name: 'Reactjs'
    },
    {
      id: 7,
      name: 'Reactjs'
    },
    {
      id: 8,
      name: 'Reactjs'
    }
  ]
  return (
    <div>
      <Card className="mt-10">
        <Row>
          <div className='flex flex-row justify-between'>
            <Title className="text-left">Skills</Title>
            <div>
              <Button>Update Skills</Button>
            </div>
          </div>

        </Row>
        <Space direction="vertical" className="">
          {skillFake.map((item) => {
            return (
              <div key={item.id}>
                <Title level={5}>{item.name}</Title>
                <Divider />
              </div>
            )
          })}
        </Space>
      </Card>
    </div>
  );
};

export default Skill;
