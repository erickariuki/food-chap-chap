import React, { useState } from 'react';
import './css/FollowButton.css';
import { useParams, useNavigate } from 'react-router-dom';

function FollowButton({  users }) {
  const { Id } = useParams();
  console.log(Id);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  // console.log(users)
  
  const user = users.find((user) => user.id.toString() === Id);

  console.log(user);

  // Function to handle following/unfollowing
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Unfollow the user
        await fetch(`/users/${user.baseId}/unfollow`, {
          method: 'DELETE',
          // Add any necessary headers here (e.g., authentication headers)
        });
        setIsFollowing(false);
      } else {
        // Follow the user
        await fetch(`/users/${user.baseId}/follow`, {
          method: 'POST',
          // Add any necessary headers here (e.g., authentication headers)
        });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  return (
    <div className="user-profile">
      {/* <h2>{user.username}'s Profile</h2> */}
      {/* <p>Followers: {user.followers}</p>
      <p>Following: {user.following}</p> */}
      
              <div>
                <button onClick={handleFollowToggle}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                <button onClick={() => navigate(`/user/${user.baseId}/followers`)}>
                  Followers
                </button>
                <button onClick={() => navigate(`/user/${user.baseId}/following`)}>
                  Following
                </button>
              </div>
   
    </div>
  );
}

export default FollowButton;
