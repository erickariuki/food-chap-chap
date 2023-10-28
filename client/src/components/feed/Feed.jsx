import React, { useEffect, useState } from "react";
import axios from "axios";
import './feed.css'

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        if (Array.isArray(response.data.posts)) { // Ensure the data is an array
          setPosts(response.data.posts);
        } else {
          console.error("Error: fetched data is not an array");
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

  return (
    <div className="feed">
      {posts.map((post) => (
        <div className="card" key={post._id}>
          <img className="card-img" src={post.image} alt="Post" />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
          </div>
          <div className="card-footer">
            <small>Posted by: {post.author}</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;


