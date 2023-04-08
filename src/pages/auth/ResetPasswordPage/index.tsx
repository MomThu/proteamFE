/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Space, Spin, Typography } from 'antd';
import { api } from 'api/request';
import url from 'api/url';
import imageLogin from 'assets/image/login_background.png';
import routesMap from 'layouts/routesMap';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { HttpStatus } from 'utils/constants';
import { notificationError } from 'utils/notifications';

const { Title } = Typography;

interface FormResetPassword {
  newPassword: string;
  confirmNewPassword: string;
  userId?: string;
  resetString?: string;
}

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [spending, setSpending] = useState(false);
  const [isResetSuccess, setIsResetSuccess] = useState(false);
  const [searchParams] = useSearchParams();

  const [form] = Form.useForm<FormResetPassword>();

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();
      setSpending(true);
      handleResetPassword(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleResetPassword = async (data: FormResetPassword) => {
    const userId = searchParams.get('userId') || undefined;
    const resetString = searchParams.get('resetString') || undefined;
    try {
      const response = await api.post<BaseResponse<any>>(url.resetPassword, {
        newPassword: data.newPassword,
        userId,
        resetString,
      });
      if (response.data?.code === HttpStatus.OK) {
        setSpending(false);
        setIsResetSuccess(true);
      } else {
        notificationError('Password reset failed');
        setSpending(false);
      }
    } catch (error) {
      notificationError('Password reset failed');
      setSpending(false);
    }
  };

  const handleClickLogin = () => {
    navigate(routesMap.LOGIN);
  };

  return (
    <div
      className="h-[100vh] flex flex-col justify-center"
      style={{
        backgroundImage: `url(${imageLogin})`,
      }}
    >
      {spending ? (
        <Space size="large" className="flex justify-center">
          <Spin size="large" className="text-black" />
        </Space>
      ) : !isResetSuccess ? (
        <div className="flex justify-end mr-36 ">
          <div className="bg-white flex flex-col py-8 px-20 rounded-xl shadow-xl max-w-[528px]">
            <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">Reset Password</Title>

            <Form form={form}>
              <Form.Item
                name={'newPassword'}
                labelAlign="left"
                required
                rules={[{ required: true, message: 'Please input new password!' }]}
              >
                <Input.Password placeholder="New password" size="large" />
              </Form.Item>
              <Form.Item
                name={'confirmNewPassword'}
                labelAlign="left"
                required
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The passwords does not match!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm new password" size="large" />
              </Form.Item>
            </Form>

            <Button block type="primary" className="mt-5" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[500px] text-center bg-gray-700 text-white p-8 rounded-md">
            <h2 className="md:text-[32px] leading-10 mb-6">Password Reset</h2>
            <p className="mb-4">{`Your password has been reset successfully.`}</p>
            <p className="mb-4">{`You may now login`}</p>
            <div className="flex justify-center">
              <Button onClick={handleClickLogin}>Login</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
