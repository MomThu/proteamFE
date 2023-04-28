import { FileAddOutlined, FileSyncOutlined, SendOutlined } from '@ant-design/icons/lib/icons';
import { Button, Input } from 'antd';
import BaseUploadFile from 'components/base/UpLoad/UploadFile';
import React from 'react';

export default function ConversationContent() {
  const handleInputMessage = () => {
    console.log('first');
  };

  const handleSuccess = (id: number, url: string, fileName: string) => {
    console.log(url);
  };

  const handleSubmitMessage = () => {
    console.log('first');
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="px-5 border-b-2 border-0 !border-gray-400 border-solid sticky top-0 shadow-[0_0_20px_rgba(0,0,0,0.14)] flex justify-between items-center">
        <h2 className="uppercase leading-[48px] font-semibold text-[13px]">
          Chat with <span className="text-primary">Name</span>
        </h2>
        <Button type="text" className="uppercase font-medium text-[13px]">
          <FileSyncOutlined /> <span>share media</span>
        </Button>
      </div>
      <div className="flex-1 relative pb-16">
        <div className="h-16 absolute bottom-0  border-0 border-t border-solid border-gray-400 w-full flex items-center gap-2 px-5">
          <Input onChange={handleInputMessage} placeholder="Write your message" className="flex-1" />
          <BaseUploadFile
            onSuccess={handleSuccess}
            path="file"
            icon={<Button type="text" className="uppercase font-medium text-[13px]" icon={<FileAddOutlined />} />}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSubmitMessage} />
        </div>
      </div>
    </div>
  );
}
