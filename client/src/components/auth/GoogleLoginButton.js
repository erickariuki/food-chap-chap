import React from 'react';



const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    const googleLoginUrl = 'https://accounts.google.com/o/oauth2/auth' +
      `?client_id=910844622670-qbbjerfp12uo9kv8i1djb9946cadh8ct.apps.googleusercontent.com` +
      '&redirect_uri=http://localhost:4000/auth/google/redirect' +
      '&response_type=token' +
      '&scope=profile email';

    window.location.href = googleLoginUrl;
  };

  return (
    <button onClick={handleGoogleLogin}>Login with Google</button>
  );
};

export default GoogleLoginButton;