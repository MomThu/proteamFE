import { Button, Form, Input, Space, Spin, Typography } from 'antd';
import { useAppDispatch } from 'app/hooks';
import imageLogin from 'assets/image/login_background.png';
import React, { useState } from 'react';
import { getLinkToResetPassword } from 'redux/auth/actions';
import { notificationError } from 'utils/notifications';

const { Title } = Typography;

interface FormResetPassword {
  email: string;
  redirectUri?: string;
}

const ForgottenPasswordPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [emailedToReset, setEmailedToReset] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  const [form] = Form.useForm<FormResetPassword>();

  const handleSubmit = async () => {
    try {
      const data = await form.validateFields();
      setSendingEmail(true);
      handleGetLinkResetPassword(data);
    } catch (error) {
      // console.log(error);
    }
  };

  const handleGetLinkResetPassword = async (data: FormResetPassword) => {
    try {
      await dispatch(
        getLinkToResetPassword({ ...data, redirectUri: `${window.location.origin}/reset-password` })
      ).unwrap();
      setSendingEmail(false);
      setEmailedToReset(true);
    } catch (error) {
      notificationError('Email does not exist');
      setSendingEmail(false);
    }
  };

  return (
    <div
      className="h-[100vh] flex flex-col justify-center"
      style={{
        backgroundImage: `url(${imageLogin})`,
      }}
    >
      {sendingEmail ? (
        <Space size="large" className="flex justify-center">
          <Spin size="large" className="text-black" />
        </Space>
      ) : !emailedToReset ? (
        <div className="flex justify-end mr-36 ">
          <div className="bg-white flex flex-col py-8 px-20 rounded-xl shadow-xl max-w-[528px]">
            <Title className="text-center text-[40px] leading-[48px] font-bold mb-8">Password Reset</Title>

            <Form form={form} className="mt-5">
              <Form.Item
                name={'email'}
                labelAlign="left"
                required
                rules={[{ required: true, message: 'Please input your email!' }]}
              >
                <Input placeholder="email address" size="large" />
              </Form.Item>
            </Form>
            <div className="flex justify-center">
              <Button block type="primary" className="mt-5 !w-1/2" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[500px] text-center bg-gray-700 text-white p-8 rounded-md">
            <h2 className="md:text-[32px] leading-10 mb-6">Password Reset</h2>
            <p className="mb-4">
              {`An email with a password reset link has been sent to your email: `}
              <span className="font-bold">{form.getFieldValue('email')}</span>
            </p>
            <p>{`Check your email and click to the link to proceed!`}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgottenPasswordPage;
