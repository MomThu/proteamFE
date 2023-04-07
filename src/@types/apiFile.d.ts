interface IFormatFile {
  size: number;
  originalName: string;
  extension: string;
  mimetype: string;

  isValidSize?: boolean;
  checkingFileType?: {
    isValid: boolean;
    errorMessage: string;
  };
  isTypeNSizeValid?: boolean;
  //
  id?: number;
  success?: boolean;
  url?: string;
  file: File;
}

interface IRegisterFileParams {
  id?: number;
  path: string;
  fileName: string;
  originalName: string;
  extension: string;
  mimetype: string;
  size: number;
}

interface IRegisterFileResponse {
  id: number;
  originName: string;
  fileName: string;
  path: string;
  extension: string;
  mimetype: string;
  size: number;
  url: string;
}

interface IUploadFileToS3Response {
  success: boolean;
  code?: number;
  fileName?: string;
  originalName?: string;
  id?: number;
  url?: string;
}

interface IGetPreSignedUrlResponse {
  path: string;
  originalName: string;
  fileName: string;
  presignedUrl: string;
}
