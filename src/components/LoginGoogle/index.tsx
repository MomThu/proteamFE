import React from "react";
import { GoogleLogin } from 'react-google-login'

const clientId = '654377436799-so6jtlbab37olccktpu7aptg81h6vntv.apps.googleusercontent.com'
const LoginGoogle: React.FC = () => {
  const onSuccess = (res: any) => {
    console.log('Login Success Google: ', res.profileObj)
  }
  const onFailure = (res: any) => {
    console.log('Login Failed Google: ', res)
  }
  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText='Google Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ margin: '10px' }}
        isSignedIn={true}
      />
    </div>
  )
}

export default LoginGoogle