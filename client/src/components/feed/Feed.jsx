import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Post from "../post/Post";
import Share from "../CreatePost/CreatePost";
import "./feed.css";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user) {
          const endpoint = username
            ? `/UserProfile/${username}`
            : `/timeline/${user._id}`;
          const response = await axios.get(`http://localhost:8080/api/posts${endpoint}`);
          setPosts(response.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Check if user exists before fetching posts
    if (user) {
      fetchPosts();
    }
  }, [username, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

