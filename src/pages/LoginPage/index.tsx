import { Button, Form, Input, Typography } from 'antd';
import routesMap from 'layouts/routesMap';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationError } from 'utils/notifications';

const { Title } = Typography;

interface FormLogin {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const natigate = useNavigate();

  const [form] = Form.useForm<FormLogin>();

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();
      handleLogin(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleLogin = async (data: FormLogin) => {
    if (data.username === 'admin' && data.password === '123456') {
      natigate(routesMap.HOME);
    } else {
      notificationError('Tên người dùng hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div
      className="min-h-screen p-5"
    >
      <div className="flex justify-center items-center flex-col">
        <div className="h-[10vh]"></div>
        <div className="bg-white p-8 rounded-xl shadow-xl w-[450px]">
          <Title level={3} className="text-center">
            Đăng nhập
          </Title>
          <Form form={form}>
            <Form.Item
              name={'username'}
              labelCol={{ md: 24 }}
              wrapperCol={{ md: 24 }}
              label="Tài khoản"
              labelAlign="left"
              required
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder="Nhập tài khoản" />
            </Form.Item>
            <Form.Item
              name={'password'}
              labelCol={{ md: 24 }}
              wrapperCol={{ md: 24 }}
              label="Mật khẩu"
              labelAlign="left"
              required
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input placeholder="Nhập mật khẩu" />
            </Form.Item>
          </Form>

          <br />
          <Button block type="primary" className="mt-5" onClick={handleSubmit}>
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
