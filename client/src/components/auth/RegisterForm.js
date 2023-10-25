import React, { useState } from 'react';

function RegisterForm({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    address: '',
    password: '',
    passwordConfirmation: '',
    userType: 'customer', // Default userType
  });
  const [errorMessage, setErrorMessage] = useState('');

  function redirectToDashboard(user) {
    if (user.user_type === 'customer') {
      window.location.href = '/customerdash';
    } else if (user.user_type === 'restaurant_owner') {
      window.location.href = '/restaurantdash';
    } else if (user.user_type === 'admin') {
      window.location.href = '/admindash';
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            onLogin(user);
            setErrorMessage(null);
            redirectToDashboard(user);
          });
        } else {
          setErrorMessage('Your passwords do not match');
        }
      })
      .catch((error) => {
        setErrorMessage('An error occurred. Please try again.');
      });
  }

  // Display form data
 console.log(formData);

  return (
    <>
      <div className="modal-header">
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
        <h5 className="modal-title foodbakery-dev-login-main-title">Register </h5>
      </div>
      <div className="modal-body">
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
        <p className="foodbakery-dev-login-top-msg"></p>
        <div className="cs-login-pbox">
          <div className="status status-message"></div>
          <form onSubmit={handleSubmit}>
            <div className="input-filed">
              <select
                className="chosen-select"
                name="user_type"
                aria-label="Default select example"
                style={{
                  marginBottom: '23px',
                  color: 'black',
                  paddingBottom: '6px',
                }}
                value={formData.userType}
                onChange={(e) => setFormData({ ...formData, userType: e.target.value })}
              >
                <option value="customer">Customer</option>
                <option value="restaurant_owner">Restaurant</option>
              </select>
            </div>
            <div className="input-filed">
              <i className="icon-user4"></i>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                autoComplete="off"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
                autoComplete="off"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                type="text"
                className="form-control"
                id="phone"
                placeholder="Phone Number"
                autoComplete="off"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
                autoComplete="off"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                className="form-control"
                type="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="current-password"
              />
            </div>
            <div className="input-filed">
              <i className="icon-unlock-alt"></i>
              <input
                className="form-control"
                type="password"
                id="password_confirmation"
                placeholder="Password Confirmation"
                value={formData.passwordConfirmation}
                onChange={(e) => setFormData({ ...formData, passwordConfirmation: e.target.value })}
                autoComplete="current-password"
              />
            </div>
            <span className="signup-alert">
              <b>Note :</b> Please enter your correct email, and we will send you a password on that email.
            </span>
            <div className="checkbox-area">
              <input type="checkbox" id="terms-head" className="foodbakery-dev-req-field" placeholder="" />
              <label for="terms-head">
                By Registering You Confirm That You Accept the <a target="_blank" href="#">Terms & Conditions</a> and <a target="_blank" href="#">Privacy Policy</a>
              </label>
            </div>
            <div className="input-filed input-field-btn">
              <div className="ajax-login-button input-button-loader">
                <input type="submit" className="cs-bgcolor" value="Register" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
