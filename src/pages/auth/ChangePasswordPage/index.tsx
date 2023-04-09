/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, Typography } from 'antd';
import { api } from 'api/request';
import url from 'api/url';
import imageLogin from 'assets/image/login_background.png';
import React from 'react';
import { notificationError, notificationSuccess } from 'utils/notifications';

const { Title } = Typography;

interface FormResetPassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePasswordPage: React.FC = () => {
  const [form] = Form.useForm<FormResetPassword>();

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();
      handleResetPassword(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleResetPassword = async (data: FormResetPassword) => {
    try {
      await api.patch<BaseResponse<any>>(url.changePassword, {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      });
      notificationSuccess("Change password successfully!")
    } catch (error) {
      notificationError('Password reset failed');
    }
  };

  return (
    <div
      className="h-[100vh] flex flex-col justify-center"
      style={{
        backgroundImage: `url(${imageLogin})`,
      }}
    >
      <div className="flex justify-end mr-36 ">
        <div className="bg-white flex flex-col py-8 px-20 rounded-xl shadow-xl max-w-[528px]">
          <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">Reset Password</Title>

          <Form form={form}>
            <Form.Item
              name={'oldPassword'}
              labelAlign="left"
              required
              rules={[{ required: true, message: 'Please input current password!' }]}
            >
              <Input.Password placeholder="Current password" size="large" />
            </Form.Item>
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
    </div>
  );
};

export default ChangePasswordPage;
