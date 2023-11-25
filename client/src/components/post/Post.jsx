// Post.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';
import { VscComment } from 'react-icons/vsc';
import { FiSend } from 'react-icons/fi';
import { IoBookmarkOutline } from 'react-icons/io5';
import { FiMoreHorizontal } from 'react-icons/fi';
import './post.css';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch posts data with user information
    axios.get('http://localhost:8080/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  
    // Fetch user data separately
    axios.get('http://localhost:8080/api/getuser')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  // Function to handle like action
  const handleLike = (postId) => {
    // Implement the logic for liking a post
    console.log(`Liked post with ID: ${postId}`);
  };

  // Function to handle comment action
  const handleComment = (postId) => {
    // Implement the logic for commenting on a post
    console.log(`Commented on post with ID: ${postId}`);
  };

  // Function to handle share action
  const handleShare = (postId) => {
    // Implement the logic for sharing a post
    console.log(`Shared post with ID: ${postId}`);
  };

  console.log(users, 'user not found')
  console.log(posts)
  return (
    <div>
      {posts.map(post => {
        const user = users.find(user => user._id === post.postedBy);

        return (
          <div key={post._id} className='post-container'>
            <div className='profile-details'>
              {user ? (
                <>
                  <img src={user.profilePic} className='profile-img' alt='Profile' />
                  <span>{user.username}</span>
                </>
              ) : (
                <p>Posted By: Unknown</p>
              )}
            </div>
            <FiMoreHorizontal className='more' />
            <div className='post-details'>
              <img src={post.pic} className='post-image' alt='Post' />
            </div>
            <div className='post-actions'>
              <div className='like-comment-icons'>
                <AiOutlineHeart onClick={() => handleLike(post._id)} />
                <VscComment onClick={() => handleComment(post._id)} />
                <FiSend onClick={() => handleShare(post._id)} />
              </div>
              <IoBookmarkOutline className='bookmark-icon' />
            </div>
            <div className='post-meta'>
              <div className='post-meta-user'>
                {user ? (
                  <>
                    <img src={user.profilePic} alt='User' />
                    <p>Liked By <strong>{user.username}</strong> and <strong>other 1209</strong></p>
                  </>
                ) : (
                  <p>Liked By Unknown</p>
                )}
              </div>
              <p><strong>{user ? user.username : 'Unknown'}</strong> {post.body}</p>
              <span className='post-meta-comments'>Show all the {post.comments.length} comments</span>
              <p className='post-meta-time'>{new Date(post.createdAt).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Post;
