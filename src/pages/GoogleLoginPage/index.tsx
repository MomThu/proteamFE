import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const GoogleLoginPage: React.FC = () => {
  useEffect(() => {
    const [searchParams] = useSearchParams();
    console.log(searchParams);
  }, []);

  return <div>Google login page</div>;
};

export default GoogleLoginPage;
