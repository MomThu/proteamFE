import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { get } from 'lodash';

import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const phpServerEndpoint = 'http://localhost:9000/api/v1/signed-url-put-object';

const UploadAvatar = () => {
  const [key, setKey] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  
  return (
    <div>
      {/* <Upload
        disabled={loading}
        accept="jpg/png/jpeg"
        customRequest={({ file, onError, onSuccess, onProgress }) => {
          const fileType = get(file, 'type', '');
          const fileName = get(file, 'name', '');
          console.log('Preparing the upload');
          console.log(fileType, 'fileType');

          const key = `image_${fileName}`;
          console.log('key', key);
          setKey(key);
          setLoading(true);

          axios
            .post(`${phpServerEndpoint}`, {
              key,
              fileType,
            })
            .then((response) => {
              const returnData = response.data;
              const signedRequest = returnData.signedRequest;

              console.log('Recieved a signed request ' + signedRequest);

              // Put the fileType in the headers for the upload
              const options = {
                onUploadProgress: (event: ProgressEvent) => {
                  const { loaded, total } = event;
                  onProgress(
                    {
                      percent: Math.round((loaded / total) * 100),
                    },
                    // file
                  );
                },
                headers: {
                  'Content-Type': fileType,
                },
              };

              const t0 = performance.now();

              axios
                .put(signedRequest, file, options)
                .then((result) => {
                  console.log(result, "result day");
                  
                  const t1 = performance.now();
                  console.log('Response from s3');
                  console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
                  setLoading(false);
                  onSuccess(result, file);
                  message.success('Successfully Upload!');
                })
                .catch((error) => {
                  onError(error);
                  alert('ERROR ' + JSON.stringify(error));
                });
            })
            .catch((error) => {
              alert(JSON.stringify(error));
            });
        }}
      >
        <Button loading={loading}>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload> */}
    </div>
  );
};

export default UploadAvatar;
