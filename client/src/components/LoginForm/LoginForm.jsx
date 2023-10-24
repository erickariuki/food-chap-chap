import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        setErrorMessage(null);
        redirectToDashboard(user);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Login details do not match');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  function redirectToDashboard(user) {
    if (user.user_type === 'customer') {
      window.location.href = '/customerdash';
    } else if (user.user_type === 'restaurant_owner') {
      window.location.href = '/restaurantdash';
    } else if (user.user_type === 'admin') {
      window.location.href = '/admindash';
    } else {
      setErrorMessage('Invalid user type');
    }
  }

  return (
    <>
      {/* Your JSX for the login form */}
      <form onSubmit={handleSubmit}>
        {/* ... */}
        <input
          type="submit"
          className="cs-bgcolor"
          value="Log in"
          disabled={!username || !password} // Disable the button if username or password is empty
        />
      </form>
      {/* Display error message */}
      {errorMessage && (
        <p
          style={{
            backgroundColor: 'red',
            color: 'white',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
          }}
        >
          {errorMessage}
        </p>
      )}
    </>
  );
}

export default LoginForm;
