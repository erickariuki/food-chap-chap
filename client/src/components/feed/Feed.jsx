import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from 'react-grid-layout';
import Modal from 'react-modal';
import "./feed.css"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircle from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import ToggleButton from '@mui/material/ToggleButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';


const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [expandedPosts, setExpandedPosts] = useState({});


  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('http://localhost:8080/api/user/:username')
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            console.log('The requested resource could not be found.');
          } else {
            console.log('An error occurred.', error);
          }
        });

    };

    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:8080/api/posts');
      console.log(response)
      setPosts(response.data);
    };

    fetchUser();
    fetchPosts();
  }, []);

  const handleFollow = async () => {
    if (!isFollowing) {
      await axios.post('http://localhost:8080/api/user/follow', { followId: user._id });
      setIsFollowing(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleUnfollow = async () => {
    await axios.post('http://localhost:8080/api/user/unfollow', { unfollowId: user._id });
    setIsFollowing(false);
    setIsModalOpen(false);
  };

  const handleLike = async (postId) => {
    await axios.post(`http://localhost:8080/api/posts/${postId}/like`);
    setIsLiked(true);
  };

  const handleUnlike = async (postId) => {
    await axios.post(`http://localhost:8080/api/posts/${postId}/unlike`);
    setIsLiked(false);
  };


  const handleShare = async (postId, platform) => {
    const response = await axios.post(`http://localhost:8080/api/posts/${postId}/share`, { platform });
    window.open(response.data.shareUrl, '_blank');
  };


  const handleComment = async (postId, text) => {
    await axios.post(`http://localhost:8080/api/posts/comment`, { postId, text });
  };

  const layout = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 1, h: 2 },
    { i: 'c', x: 2, y: 0, w: 1, h: 2 },
  ];

  return (
    <div className="feed-container">
      {user && (
        <div className="post-card">
          <img src={user.profilePic} alt="Profile" />
          <h2>{user.name} @{user.username}</h2>
          <button onClick={handleFollow}>{isFollowing ? 'Following' : 'Follow'}</button>
          <IconButton onClick={handleFollow}>
            <PersonAddAltIcon />
          </IconButton>
        </div>
      )}
      {posts.map((post) => (
        <div key={post._id} className="post-card">
          <h2>{post.title}</h2>
          <p>
            {post.content && (
              expandedPosts[post._id]
                ? post.content
                : post.content.slice(0, 100)
            )}
            {!expandedPosts[post._id] && (
              <button onClick={() => setExpandedPosts({ ...expandedPosts, [post._id]: true })}>
                Show More
              </button>
            )}
          </p>
          <img src={post.pic} alt="Post" className="post-image" />

          <div className="icon-buttons">
            <IconButton
              onClick={() => {
                if (isLiked) {
                  handleUnlike(post._id);
                } else {
                  handleLike(post._id);
                }
              }}
              style={{ color: isLiked ? 'red' : 'inherit' }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={() => {
                handleShare(post._id, 'facebook');
                setAnchorEl(null);
              }}>
                <FacebookIcon />
              </MenuItem>
              <MenuItem onClick={() => {
                handleShare(post._id, 'twitter');
                setAnchorEl(null);
              }}>
                <TwitterIcon />
              </MenuItem>
           // ... other social media icons ...
            </Menu>
            <IconButton onClick={() => setSelectedPost(post)}>
              <CommentIcon />
            </IconButton>
          </div>

          {selectedPost && (
            <div>
              <textarea onChange={(e) => setSelectedPost({ ...selectedPost, comment: e.target.value })} />
              <button onClick={() => handleComment(selectedPost._id, selectedPost.comment)}>Post Comment</button>
            </div>
          )}

        </div>
      ))}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <h2>Confirm Unfollow</h2>
          <button onClick={handleUnfollow}>Confirm</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </Modal>
      )}
    </div>
  );


};

export default Feed;
