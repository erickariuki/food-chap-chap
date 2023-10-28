import React, { useState, useEffect } from "react";
import axios from 'axios';

const Post = ({ postId }) => {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}/likes`);
        setLikes(response.data);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    fetchPost();
    fetchComments();
    fetchLikes();
  }, [postId]);

  return (
    <div key={post._id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {post.pic && <img src={post.pic} alt="Post" />}
      <h4>Likes: {likes.length}</h4>
      <h4>Comments:</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Post;
