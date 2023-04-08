import UploadAvatar from 'components/base/UpLoad/UploadAvatar';
import React from 'react';

const HomePage: React.FC = () => {
  const handleUploadSuccess = (id: number, url: string) => {
    console.log('imageId', id);
    console.log('imageSrc', url);
    // save data to profile user here
  };

  return (
    <div>
      <p>Homepage</p>
      <UploadAvatar onSuccess={handleUploadSuccess} />
    </div>
  );
};

export default HomePage;
