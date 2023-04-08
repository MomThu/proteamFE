import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { HttpStatus, ImageFileTypes } from 'utils/constants';
import { notificationError } from 'utils/notifications';
import { fileService, uploadFileToS3 } from 'api/file.service';

interface IProps {
  path?: string;
}

function UploadAvatar(props: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const acceptFileTypes = ImageFileTypes.join(',');
  const [avatarId, setAvatarId] = useState<number>();
  const [avatarUrl, setAvatarUrl] = useState('');

  const onChange: UploadProps['onChange'] = ({ file, fileList }) => {
    setFileList(fileList);
    if (file.status === 'success') {
      console.log(file.response);
      setAvatarUrl(file.response?.url);
    }
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
    setAvatarId(registerFileResponse?.data?.data.id);

    return {
      success: true,
      fileName,
      url: registerFileResponse?.data?.data.url,
    };
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        beforeUpload={onBeforeUpload}
        accept={acceptFileTypes}
        customRequest={handleFileUpload}
      >
        {fileList.length < 1 && 'Upload'}
      </Upload>
    </ImgCrop>
  );
}

export default UploadAvatar;
