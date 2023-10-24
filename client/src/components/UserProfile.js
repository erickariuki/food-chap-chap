import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/UserProfile.css'; // Import a CSS file for this component
import FollowButton from './FollowButton';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with your backend API URL
    const apiUrl = '/me'; 
    axios
      .get(apiUrl)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-heading">User Profile</h2>
      <div className="user-profile-details">
        <p>
          <span className="profile-label">Username:</span> {user.username}
        </p>
        <p>
          <span className="profile-label">Email:</span> {user.email}
        </p>
        <p>
          <span className="profile-label">Address:</span> {user.address}
        </p>
        <p>
          <span className="profile-label">Phone:</span> {user.phone}
        </p>
        <div>
          <FollowButton user={user} /> {/* Pass the user data as a prop */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
