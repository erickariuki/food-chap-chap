import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "../CreatePost/CreatePost"; // Import the CreatePosts component
import Post from "../post/Post"; // Import the Posts component

const Feed = () => {
  const [subscribedPosts, setSubscribedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscribedPosts = async () => {
      try {
        const response = await axios.get("/api/posts/getsubpost");
        setSubscribedPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscribed posts:", error);
        setError("Error fetching subscribed posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchSubscribedPosts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <CreatePost /> {/* Render the CreatePosts component */}
      <h2>Subscribed Posts</h2>
      {subscribedPosts.map((post) => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          {post.pic && <img src={post.pic} alt="Post" />}
        </div>
      ))}
      <Post /> {/* Render the Posts component */}
    </div>
  );
};

export default Feed;

