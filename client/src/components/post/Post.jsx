import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts");
        setPosts(response.data); // Assuming the API response is an array of posts
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError("Error fetching posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {post.pic && <img src={post.pic} alt="Post" />}
        </div>
      ))}
    </div>
  );
};

export default Posts;
