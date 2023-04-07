import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useState } from 'react';
import ImgCrop from 'antd-img-crop';
import { ImageFileTypes } from 'utils/constants';
import { fileService, uploadFileToS3 } from 'api/file.service';

interface IProps {
  path?: string;
}

function UploadAvatar(props: IProps) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const acceptFileTypes = ImageFileTypes.join(',');

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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

  return (
    <ImgCrop rotationSlider>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        accept={acceptFileTypes}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>
    </ImgCrop>
  );
}

export default UploadAvatar;
