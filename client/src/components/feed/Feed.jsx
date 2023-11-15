import React, { useEffect, useState } from "react";
import axios from "axios";
import './feed.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';




import { Link } from 'react-router-dom';

// Import your icons here

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});
  const [followStates, setFollowStates] = useState({});
  const [followingUsers, setFollowingUsers] = useState([]);
  const [expanded, setExpanded] = useState({});


  useEffect(() => {
    setLoading(true);

    const fetchPosts = async () => {
      try {
        const postResponse = await axios.get('http://localhost:8080/api/posts');

        if (postResponse.data && Array.isArray(postResponse.data.posts)) {
          const postWithUserData = await Promise.all(
            postResponse.data.posts.map(async (post) => {
              if (post.author && post.author.username) {
                const userResponse = await axios.get(`http://localhost:8080/api/user/${post.author.username}`);
                return { ...post, author: userResponse.data };
              } else {
                return post;
              }
            })
          );

          setPosts(postWithUserData);
        } else {
          console.error('Error:', postResponse.status, postResponse.data);
        }

        console.log(postResponse.data);
      } catch (error) {
        console.error('Error fetching posts:', error.response.data);
      }
    };

    fetchPosts();

    setLoading(false);
  }, []);


  const handleFollowToggle = async (userId) => {
    if (!userId) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      if (followingUsers.includes(userId)) {
        // User is currently following, unfollow them
        await axios.delete(`http://localhost:8080/api/user/unfollow/${userId}`, config);
        setFollowingUsers(prevFollowingUsers => prevFollowingUsers.filter(id => id !== userId));
      } else {
        // User is not following, follow them
        await axios.post(`http://localhost:8080/api/user/follow/${userId}`, {}, config);
        setFollowingUsers(prevFollowingUsers => [...prevFollowingUsers, userId]);
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  const handleLike = async (postId) => {
    if (!postId) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // Send a request to like the post
      await axios.post(`http://localhost:8080/api/posts/${postId}/like`, {}, config);

      // Update the local state to indicate that the post has been liked
      setPosts(prevPosts =>
        prevPosts.map(post => (post._id === postId ? { ...post, liked: true } : post))
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleComment = async (postId, commentText) => {
    if (!postId) {
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // Send a request to add a comment to the post
      await axios.post(`http://localhost:8080/api/posts/${postId}/comments`, { text: commentText }, config);

      // Fetch updated comments for the post and update the local state
      const response = await axios.get(`http://localhost:8080/api/posts/${postId}/comments`);
      setPosts(prevPosts =>
        prevPosts.map(post => (post._id === postId ? { ...post, comments: response.data } : post))
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleShare = async (postId, platform) => {
    if (!postId) {
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8080/api/posts/${postId}/share`, { platform });
      window.open(response.data.shareUrl, '_blank');
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const handleExpandClick = (id) => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    });
  };


  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }
  console.log('Users:', users);
  console.log('Posts:', posts);

  return (
    <div className="feed">
      <div className="sub-header align-center">
        <div className="subheader-holder" >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="text-holder">
                  <div className="page-title ">
                    <h1>Blogs</h1>
                  </div>
                  <p>Creating The World's Greatest Food Community with Food ChapChap</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        {posts.map((post) => (
          <Card key={post._id} className="card">
            <div className="card-header">
              <div className="user-details">
                <img src={post.author && post.author.profilePic} alt="Profile Pic" className="profile-pic" />
                <Typography variant="h6">
                  {post.author ? post.author.name : 'Unknown'}
                </Typography>
                <Typography variant="subtitle1">
                  @{post.author ? post.author.username : 'Unknown'}
                </Typography>
              </div>
              <div className="follow-button" onClick={() => handleFollowToggle(post.author?._id)}>
                <PersonAddAltIcon />
              </div>
            </div>
            <div className="card-body">
              <Typography variant="h6">
                {post.title}
              </Typography>
              <div className={`post-body ${expanded[post._id] ? 'expanded' : ''}`}>
                {post.content}
              </div>
              <Button className="show-more-button" onClick={() => handleExpandClick(post._id)}>
                {expanded[post._id] ? 'Show Less' : 'Show More'}
              </Button>
              <Typography variant="image">
                {post.image && <img src={post.image} alt="Post" />}
              </Typography>

            </div>
            <div className="card-footer">
              <div className="action-icons">
                <IconButton onClick={() => handleLike(post._id)}>
                  <FavoriteIcon color={post.liked ? 'secondary' : 'action'} />
                </IconButton>
                <IconButton onClick={() => handleShare(post._id, 'facebook')}>
                  <ShareIcon />
                </IconButton>
                <IconButton onClick={() => handleComment(post._id, 'Your comment text')}>
                  <CommentIcon />
                </IconButton>
              </div>
              <IconButton className="more-options">
                <MoreHorizIcon />
              </IconButton>
            </div>
          </Card>

        ))}
      </div>
    </div>
  );
}

export default Feed;
