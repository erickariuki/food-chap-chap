import React, { useState } from 'react';
import '../css/RestaurantSignUp.css';

function RestaurantSignup() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
    cuisine: '',
    openingHours: '',
    ratings: '',
    permitDocument: null,
    taxDocument: null,
    fireClearanceCertificate: null,
    advertisingSignageLicense: null,
    healthCertificate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    fetch('http://localhost:8080/restaurants/register', {
      method: 'POST',
      body: formDataToSend,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.error();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="form-container">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Restaurant Name"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="contact"
          placeholder="Contact"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cuisine"
          placeholder="Cuisine"
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="openingHours"
          placeholder="Opening Hours"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="ratings"
          placeholder="Ratings"
          onChange={handleInputChange}
        />
        <label htmlFor="permitDocument">Permit Document:</label>
        <input
          type="file"
          id="permitDocument"
          name="permitDocument"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
        <label htmlFor="taxDocument">Tax Document:</label>
        <input
          type="file"
          id="taxDocument"
          name="taxDocument"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
        <label htmlFor="fireClearanceCertificate">Fire Clearance Certificate:</label>
        <input
          type="file"
          id="fireClearanceCertificate"
          name="fireClearanceCertificate"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
        <label htmlFor="advertisingSignageLicense">Advertising Signage License:</label>
        <input
          type="file"
          id="advertisingSignageLicense"
          name="advertisingSignageLicense"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />
        <label htmlFor="healthCertificate">Health Certificate</label>
        <input
          type="file"
          id="healthCertificate"
          name="healthCertificate"
          accept=".pdf,.doc,.docx"
          onChange={handleFileUpload}
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default RestaurantSignup;
