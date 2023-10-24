import React , { useState } from 'react';
import { useParams , useNavigate} from 'react-router-dom';


function BlogProfile({ users }) {
  const { id } = useParams();
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  // Check if users data is loading or empty
  if (!users) {
    return <div>Loading...</div>;
  }

  // Find the user with the specified ID
  
  const user = users.find((user) => user.id.toString() === id);


  // Check if user is not found
  if (!user) {
    return <div className="blog-container">User not found for ID: {id}</div>;
  }
  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        // Unfollow the user
        await fetch(`/users/${id}/unfollow`, {
          method: 'DELETE',
          // Add any necessary headers here (e.g., authentication headers)
        });
        setIsFollowing(false);
      } else {
        // Follow the user
        await fetch(`/users/${id}/follow`, {
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
    <>
      <div>
        <h1>Blog Profile</h1>
        <div className="blogger-page" key={user.id}>
          <h1>Blogger Profile</h1>
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
        </div>
        <div>
        <div>
                <button onClick={handleFollowToggle}>
                  {isFollowing ? 'Unfollow' : 'Follow'}
                </button>
                <button onClick={() => navigate(`/user/${user.id}/followers`)}>
                  Followers
                </button>
                <button onClick={() => navigate(`/user/${user.id}/following`)}>
                  Following
                </button>
              </div>
        </div>
      </div>
    </>
  );
}

export default BlogProfile;
