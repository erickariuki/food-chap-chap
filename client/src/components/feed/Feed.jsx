import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../CreatePost/CreatePost";
import "./feed.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (user) {
          const res = username
            ? await axios.get(`/api/posts/profile/${username}`)
            : await axios.get(`/api/posts/timeline/${user._id}`);
          setPosts(
            res.data.sort((p1, p2) => {
              return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
          );
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
  
    // Check if user exists before fetching posts
    if (user !== null && user !== undefined) {
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
