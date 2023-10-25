import React, { useState } from 'react';
import "../css/RegisterForm.css";


function RegisterForm({ onSignUp }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    address: '',
    dateOfBirth: '',
  });

  const [passwordData, setPasswordData] = useState({
    password: '',
    passwordConfirmation: '',
  });

  const [userType, setUserType] = useState('customer');
  const [interests, setInterests] = useState([]);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleUserTypeChange = (e) => {
    setUserType(e.target.value);
  };

  const handleInterestChange = (e) => {
    const selectedInterests = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setInterests(selectedInterests);
  };

  const handleSubmit = () => {
    // Combine data from different steps into one object
    const finalFormData = {
      ...formData,
      ...passwordData,
      userType,
      interests,
    };

    // Handle form submission (e.g., send data to the server)
    onSignUp(finalFormData);
  };

  const renderFormStep = (step) => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <br />
            <label>Phone:</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <br />
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <br />
          </div>
        );
      case 2:
        return (
          <div>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            <br />
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
            />
          </div>
        );
      case 3:
        return (
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={passwordData.password}
              onChange={handlePasswordChange}
            />
            <br />
            <label>Password Confirmation:</label>
            <input
              type="password"
              name="passwordConfirmation"
              value={passwordData.passwordConfirmation}
              onChange={handlePasswordChange}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <label>User Type:</label>
            <select
              name="userType"
              value={userType}
              onChange={handleUserTypeChange}
            >
              <option value="customer">Customer</option>
              <option value="restaurant_owner">Restaurant Owner</option>
            </select>
            <br />
            <label>Interests (select multiple):</label>
            <select
              multiple
              name="interests"
              value={interests}
              onChange={handleInterestChange}
            >
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="sports">Sports</option>
              <option value="music">Music</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h1>Create your Account</h1>
      <div className="form-step">
        {renderFormStep(step)}
        <div className="button-container">
          {step > 1 && (
            <button onClick={handlePrevious}>Previous</button>
          )}
          {step < 4 ? (
            <button onClick={handleNext}>Next</button>
          ) : (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
