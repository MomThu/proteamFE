/* eslint-disable @typescript-eslint/no-explicit-any */
import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { HttpStatus, ImageFileTypes } from 'utils/constants';
import { notificationError } from 'utils/notifications';
import { fileService } from 'api/file.service';

interface IProps {
  path?: string;
  icon?: any;
  onSuccess: (id: number, url: string) => void;
}

function UploadImage(props: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const acceptFileTypes = ImageFileTypes.join(',');

  const onChange: UploadProps['onChange'] = ({ fileList }) => {
    setFileList(fileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
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
    const { data } = await fileService.getPreSignedUrl(props?.path || 'avatar', file.name);
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
    props.onSuccess(registerFileResponse?.data?.data.id, registerFileResponse?.data?.data.url);

    return {
      success: true,
      fileName,
      url: registerFileResponse?.data?.data.url,
    };
  };

  return (
    <ImgCrop rotationSlider aspect={3/2}>
      <Upload
        // listType="picture-circle"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={onBeforeUpload}
        accept={acceptFileTypes}
        customRequest={handleFileUpload}
        maxCount={1}
      >
        {fileList.length < 1 && props.icon ? props.icon : 'Upload'}
      </Upload>
    </ImgCrop>
  );
}

export default UploadImage;
