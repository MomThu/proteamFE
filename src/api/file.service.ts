import axios from 'axios';
import axiosOrigin from 'axios';

import { trimObject } from 'utils/common';
import { HttpStatus } from 'utils/constants';

class FileService {
  async getPreSignedUrl(path: string, originalName: string): Promise<BaseResponse<IGetPreSignedUrlResponse>> {
    return await axios.get('/auth/file/presigned-url', {
      params: {
        path,
        originalName,
      },
    });
  }

  async uploadFileToS3(file: File, presignedUrl: string): Promise<IUploadFileToS3Response> {
    await axiosOrigin.put(presignedUrl, file, {
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': file.type,
      },
    });
    return { success: true };
  }

  async registerFile(params: IRegisterFileParams): Promise<BaseResponse<IRegisterFileResponse>> {
    trimObject(params);
    return await axios.post('/auth/file', params);
  }

  async getFileDetail(id: number): Promise<BaseResponse<IRegisterFileResponse>> {
    return await axios.get(`/auth/file/${id}`);
  }
}

export const fileService = new FileService();

export async function uploadFile(filePath: string, fileItem: IFormatFile): Promise<IUploadFileToS3Response> {
  const getS3PreSignedUrlResponse = await fileService.getPreSignedUrl(filePath, fileItem.originalName);
  if (!getS3PreSignedUrlResponse.success)
    return {
      success: getS3PreSignedUrlResponse.success,
    };

  const { path, originalName, fileName, presignedUrl } = getS3PreSignedUrlResponse.data;

  const uploadToS3Response = await fileService.uploadFileToS3(fileItem.file, presignedUrl);

  if (!uploadToS3Response.success) {
    return {
      success: uploadToS3Response.success,
    };
  }

  const registerFileResponse = await fileService.registerFile({
    path,
    fileName,
    originalName,
    extension: fileItem.extension,
    mimetype: fileItem.mimetype,
    size: fileItem.size,
  });

  if (!registerFileResponse.success) {
    return {
      success: registerFileResponse.success,
    };
  }

  return {
    success: true,
    id: registerFileResponse.data.id,
    url: registerFileResponse.data.url,
  };
}

export async function uploadFileToS3(file: File, presignedUrl: string): Promise<IUploadFileToS3Response> {
  try {
    await axiosOrigin.put(presignedUrl, file, {
      headers: {
        'x-amz-acl': 'public-read',
        'Content-Type': file.type,
      },
    });
    return {
      success: true,
      code: HttpStatus.OK,
    };
  } catch (error) {
    return {
      success: false,
      code: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
