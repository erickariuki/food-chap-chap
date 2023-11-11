import React, { useState } from "react";
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

const Post = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const [post, setPost] = useState({});
  
  const handleComment = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/posts/${postId}/comments`, { text: commentText });
      setPost(response.data);
      setCommentText(''); // Clear comment text after posting
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/posts/${postId}/comments/${commentId}/like`);
      setPost(response.data);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return (
    <div key={post._id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {post.pic && <img src={post.pic} alt="Post" />}
      <h4>Likes: {likes.length}</h4>
      <h4>Comments:</h4>
      <ul>
        {post.comments.map((comment) => (
          <li key={comment._id}>
            {comment.text}
            <IconButton onClick={() => handleLikeComment(comment._id)}>
              <ThumbUpAltIcon />
            </IconButton>
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a comment..." />
        <IconButton onClick={handleComment}>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Post;
