import { useState } from 'react';

function RegisterForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userType, setUserType] = useState('customer');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_type: userType,
          username,
          email,
          phone,
          address,
          password,
          password_confirmation: passwordConfirmation,
        }),
      });

      if (response.ok) {
        const user = await response.json();
        onLogin(user);
        setErrorMessage(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Registration failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }

  return (
    <>
      {/* Your JSX for the registration form */}
      <form onSubmit={handleSubmit}>
        {/* ... */}
        <input
          type="submit"
          className="cs-bgcolor"
          value="Register"
          disabled={!username || !email || !phone || !address || !password || !passwordConfirmation}
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

export default RegisterForm;
