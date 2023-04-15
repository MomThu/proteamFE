/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UploadOutlined }  from '@ant-design/icons';
import React, { useState } from 'react';
import { HttpStatus } from 'utils/constants';
import { notificationError } from 'utils/notifications';
import { fileService } from 'api/file.service';

interface IProps {
  path?: string;
  icon?: any;
  onSuccess: (id: number, url: string, fileName: string,) => void;
}

function BaseUploadFile(props: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  // const acceptFileTypes = ImageFileTypes.join(',');

  const onChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList);
  };

  const onBeforeUpload = (file: File) => {
    const isLt1M = file.size / 1024 / 1024 < 2;
    if (!isLt1M) {
      notificationError('File size exceeds the allowed limit');
      return false;
    }
    return isLt1M;
  };

  const handleFileUpload = async ({ file, onSuccess }: any) => {
    const { data } = await fileService.getPreSignedUrl(props?.path || 'file', file.name);
    const { path, fileName, presignedUrl } = data.data;
    const uploadToS3Response = await fileService.uploadFileToS3(file, presignedUrl);
    if (!uploadToS3Response?.success) {
      return uploadToS3Response;
    }
    const lastDot = file.name.lastIndexOf('.');
    const registerFileResponse = await fileService.registerFile({
      path,
      originalName: file.name,
      fileName,
      size: file.size,
      extension: file.name.substr(lastDot + 1),
      mimetype: file.type,
    });

    if (registerFileResponse.data?.code !== HttpStatus.OK) {
      return {
        ...registerFileResponse.data,
      };
    }

    onSuccess('ok');
    
    props.onSuccess(registerFileResponse?.data?.data.id, registerFileResponse?.data?.data.url, registerFileResponse?.data?.data.originName);

    return {
      success: true,
      fileName,
      url: registerFileResponse?.data?.data.url,
    };
  };

  return (
    <Upload
      fileList={fileList}
      onChange={onChange}
      beforeUpload={onBeforeUpload}
      // accept={acceptFileTypes}
      customRequest={handleFileUpload}
      maxCount={1}
    >
      {fileList.length < 1 && props.icon ? props.icon : <Button icon={<UploadOutlined />}>Upload CV</Button>}
    </Upload>
  );
}

export default BaseUploadFile;
