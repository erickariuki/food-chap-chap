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



import { Link } from 'react-router-dom';

// Import your icons here

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [followStates, setFollowStates] = useState({});
  const [followingUsers, setFollowingUsers] = useState([]);

  useEffect(() => {
    // Fetch posts and user data
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts");
        setPosts(response.data.posts);
        setLoading(false);

        const userResponse = await axios.get("http://localhost:8080/api/user");
        setUser(userResponse.data);

        // Update followStates based on fetched data
        const newFollowStates = {};
        response.data.posts.forEach(post => {
          newFollowStates[post.postedBy._id] = post.postedBy.followers.includes(userResponse.data._id);
        });
        setFollowStates(newFollowStates);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowToggle = async (userId) => {
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
    try {
      const response = await axios.post(`http://localhost:8080/api/posts/${postId}/share`, { platform });
      window.open(response.data.shareUrl, '_blank');
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while data is being fetched
  }

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
          <Card className="blog-card" key={post._id}>
            <div className="blog-header">
              <div className="blog-user-info">
                <AccountCircle />
                {post.postedBy && (
                  <>
                    <Typography variant="h6">
                      {post.postedBy.name}
                    </Typography>
                    <Typography variant="subtitle1">
                      @{post.postedBy.username}
                    </Typography>
                  </>
                )}
              </div>
            </div>
              <div className="follow-button-container" onClick={() => handleFollowToggle(post.postedBy._id)}>
                <PersonAddAltIcon />
              </div>
            <div className="blog-content">
              <CardContent>
                <Typography variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2">
                  {post.content}
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              component="img"
              height="140"
              image={post.image}
              alt="Post Image"
            />
            <IconButton>
              <div onClick={() => handleLike(post._id)}>
                <FavoriteIcon color={post.liked ? 'secondary' : 'action'} />
              </div>
            </IconButton>
            <IconButton>
              <div onClick={() => handleShare(post._id, 'facebook')}>
                <ShareIcon />
              </div>
            </IconButton>
            <IconButton>
              <div onClick={() => handleComment(post._id, 'Your comment text')}>
                <CommentIcon />
              </div>
            </IconButton>
            <IconButton>
              <div>
                <MoreHorizIcon />
              </div>
            </IconButton>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Feed;
