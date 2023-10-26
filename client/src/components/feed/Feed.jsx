import React, { useEffect, useState } from 'react';
import CreatePost from '../CreatePost/CreatePost';
import Post from '../post/Post';
import './feed.css';

export default function Feed() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken'); // Get the access token from localStorage

        // Make sure you have a valid access token before making the request
        if (!accessToken) {
          // Handle the case where there is no access token (e.g., redirect to login)
          console.error('Access token is missing.');
          return;
        }

        // Fetch user data with Authorization header
        const userResponse = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const userData = await userResponse.json();
        setUser(userData);

        // Fetch all posts with Authorization header
        const postsResponse = await fetch('http://localhost:8080/api/posts/allpost', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const postsData = await postsResponse.json();
        console.log('Posts Data:', postsData); // Log the received data

        setPosts(postsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };


  fetchData();
}, []); // Empty dependency array to fetch data only once when the component mounts

return (
  <div className='mainPostContainer'>
    <CreatePost user={user} />
    {isLoading ? (
      <p>Loading...</p>
    ) : (
      posts.length > 0 ? (
        <Post key={posts._id} post={posts} /> // Displaying the first post directly without mapping
      ) : (
        <p>No posts available.</p>
      )
    )}
  </div>
);
}
