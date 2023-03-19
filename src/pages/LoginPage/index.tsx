import { Button, Form, Input, Typography } from 'antd';
import routesMap from 'layouts/routesMap';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationError } from 'utils/notifications';
import imageLogin from 'assets/image/login_background.png';
import { actionAuthLogin } from 'redux/auth/actions';
import { useAppDispatch } from 'app/hooks';
import { trim } from 'lodash';
import { getDataStorage, STORAGE_KEY } from 'utils/storage';

const { Title } = Typography;

interface FormLogin {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<FormLogin>();

  useEffect(() => {
    if (trim(getDataStorage(STORAGE_KEY.ACCESS_TOKEN))) {      
      navigate(routesMap.HOME);
    }
  }, [navigate]);

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();
      handleLogin(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleLogin = async (data: FormLogin) => {
    try {
      await dispatch(actionAuthLogin(data)).unwrap();
      navigate(routesMap.HOME);
    } catch (error) {
      notificationError('Tên người dùng hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div
      className="min-h-screen p-5"
      style={{
        backgroundImage: `url(${imageLogin})`,
      }}
    >
      <div className="flex justify-center items-center flex-col">
        <div className="h-[10vh]"></div>
        <div className="bg-white p-8 rounded-xl shadow-xl w-[450px]">
          <Title level={3} className="text-center">
            Đăng nhập
          </Title>
          <Form form={form}>
            <Form.Item
              name={'email'}
              label="Tài khoản"
              labelAlign="left"
              required
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder="Nhập tài khoản" />
            </Form.Item>
            <Form.Item
              name={'password'}
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

