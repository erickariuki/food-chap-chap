import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Follow from './Follow'; // Make sure the path to the Follow component is correct
import PersonPinIcon from '@mui/icons-material/PersonPin';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

export default function Rightbar ({ userdetails }) {
  const [followStatus, setFollowStatus] = useState(PersonAddAltIcon);

  const handleFollow = async () => {
    try {
      // Assuming you have user data stored in localStorage
      const user = JSON.parse(localStorage.getItem('user'));
      const id = user?.other?._id;
      const accessToken = user?.accessToken;

      await axios.put(`http://localhost:8080/api/user/following/${userdetails._id}`, { user: id }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setFollowStatus(PersonPinIcon);
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  useEffect(() => {
    // Check if the current user is following this user (userdetails._id) and update followStatus accordingly.
    const checkFollowStatus = async () => {
      try {
        // Assuming you have user data stored in localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const id = user?.other?._id;
        const accessToken = user?.accessToken;

        const response = await axios.get(`http://localhost:8080/api/users/followers/${userdetails._id}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (response.data.followers.includes(id)) {
          setFollowStatus(PersonPinIcon);
        } else {
          setFollowStatus(PersonAddAltIcon);
        }
      } catch (error) {
        console.error('Error checking follow status:', error);
      }
    };

    checkFollowStatus();
  }, [userdetails._id]);

  return (
    <div style={{ marginTop: "-10px" }} key={userdetails._id}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to={`/Profile/${userdetails._id}`}>
          <div style={{ display: 'flex', alignItems: "center" }}>
            <img src={`${userdetails.profile}`} className="Profileimage" alt="" />
            <div>
              <p style={{ marginLeft: "10px", textAlign: 'start' }}>{userdetails.username}</p>
              <p style={{ marginLeft: "10px", textAlign: 'start', marginTop: "-16px", fontSize: "11px", color: "#aaa" }}>Suggested for you</p>
            </div>
          </div>
        </Link>
        <div style={{ backgroundColor: "#aaa", padding: '10px', marginRight: 13, borderRadius: "50%", cursor: 'pointer' }} onClick={handleFollow}>
          <img src={`${followStatus}`} className="addfriend" alt="" />
        </div>
        {userdetails && <Follow userdetails={userdetails} />}
      </div>
    </div>
  );
}

