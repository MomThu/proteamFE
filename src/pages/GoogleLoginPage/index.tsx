import { useAppDispatch } from 'app/hooks';
import routesMap from 'layouts/routesMap';
import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { loginWithGoogle } from 'redux/auth/actions';
import { IGoogleLoginForm } from 'redux/auth/type';

const GoogleLoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    const code = searchParams.get('code');
    const form = {
      redirectUri: `${window.location.origin}/google-login`,
      code,
    } as IGoogleLoginForm;

    await dispatch(loginWithGoogle(form));
    navigate(routesMap.HOME);
  }, []);

  // the useEffect is only there to call `fetchData` at the right time
  useEffect(() => {
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [fetchData]);

  return <div></div>;
};

export default GoogleLoginPage;
