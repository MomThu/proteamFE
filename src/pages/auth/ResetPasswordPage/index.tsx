import { Button, Form, Input, Space, Spin, Typography } from 'antd';
import { useAppDispatch } from 'app/hooks';
import imageLogin from 'assets/image/login_background.png';
import routesMap from 'layouts/routesMap';
import React, { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { resetPassword } from 'redux/auth/actions';
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
  const dispatch = useAppDispatch();
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
      await dispatch(resetPassword({ ...data, userId, resetString })).unwrap();
      setIsResetSuccess(true);
    } catch (error) {
      setSpending(false);
      notificationError('Password reset failed');
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
            <p>{`You may now login`}</p>
            <div className="flex justify-center">
              <Button type="link" onClick={handleClickLogin}>
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPasswordPage;
