import React, { useState } from 'react';
import '../css/RestaurantSignUp.css';

function RegisterRestaurant() {
  const [stage, setStage] = useState(1);

  const [ownerDetails, setOwnerDetails] = useState({
    name: '',
    email: '',
    phone: '',
    id: '',
  });

  const [restaurantDetails1, setRestaurantDetails1] = useState({
    location: '',
    cuisine: '',
    openingHours: '',
  });

  const [restaurantDetails2, setRestaurantDetails2] = useState({
    ratings: '',
    permitDocument: null,
  });

  const [restaurantDetails3, setRestaurantDetails3] = useState({
    taxDocument: null,
    fireClearanceCertificate: null,
    advertisingSignageLicense: null,
    healthCertificate: null,
    image: null,
  });

  const handleNext = () => {
    setStage(stage + 1);
  };

  const handleBack = () => {
    setStage(stage - 1);
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter({ ...ownerDetails, [name]: value });
  };

  const handleFileUpload = (e, setter) => {
    const { name, files } = e.target;
    setter({ ...ownerDetails, [name]: files[0] });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log('Form submitted');
  };

  return (
    <div className="form-container">
      <h2>Restaurant Sign-Up - Stage {stage} of 4</h2>
      <form onSubmit={handleFormSubmit}>
        {stage === 1 && (
          <div>
            <input
              type="text"
              name="name"
              placeholder="Owner's Name"
              onChange={(e) => handleInputChange(e, setOwnerDetails)}
            />
            <input
              type="email"
              name="email"
              placeholder="Owner's Email"
              onChange={(e) => handleInputChange(e, setOwnerDetails)}
            />
            <input
              type="text"
              name="phone"
              placeholder="Owner's Phone"
              onChange={(e) => handleInputChange(e, setOwnerDetails)}
            />
            <input
              type="text"
              name="id"
              placeholder="Owner's ID"
              onChange={(e) => handleInputChange(e, setOwnerDetails)}
            />
          </div>
        )}
        {stage === 2 && (
          <div>
            <input
              type="text"
              name="location"
              placeholder="Restaurant Location"
              onChange={(e) => handleInputChange(e, setRestaurantDetails1)}
            />
            <input
              type="text"
              name="cuisine"
              placeholder="Cuisine"
              onChange={(e) => handleInputChange(e, setRestaurantDetails1)}
            />
            <input
              type="text"
              name="openingHours"
              placeholder="Opening Hours"
              onChange={(e) => handleInputChange(e, setRestaurantDetails1)}
            />
          </div>
        )}
        {stage === 3 && (
          <div>
            <input
              type="text"
              name="ratings"
              placeholder="Ratings"
              onChange={(e) => handleInputChange(e, setRestaurantDetails2)}
            />
            <label htmlFor="permitDocument">Permit Document:</label>
            <input
              type="file"
              id="permitDocument"
              name="permitDocument"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e, setRestaurantDetails2)}
            />
          </div>
        )}
        {stage === 4 && (
          <div>
            <label htmlFor="taxDocument">Tax Document:</label>
            <input
              type="file"
              id="taxDocument"
              name="taxDocument"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e, setRestaurantDetails3)}
            />
            <label htmlFor="fireClearanceCertificate">Fire Clearance Certificate:</label>
            <input
              type="file"
              id="fireClearanceCertificate"
              name="fireClearanceCertificate"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleFileUpload(e, setRestaurantDetails3)}
            />
            {/* Add more fields for stage 4 */}
          </div>
        )}

        <div className="button-container">
          {stage > 1 && <button onClick={handleBack}>Back</button>}
          {stage < 4 && <button onClick={handleNext}>Next</button>}
          {stage === 4 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default RegisterRestaurant;
