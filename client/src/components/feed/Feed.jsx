import React, { useEffect, useState } from "react";
import axios from "axios";
import './feed.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

// Import your icons here

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [followStates, setFollowStates] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts");
        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          setLoading(false);
        } else {
          console.error("Error: fetched data is not an array");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios.get(`http://localhost:8080/api/user`, config)
      .then(response => {
        setUser(response.data);
        const newFollowStates = {};
        posts.forEach(post => {
          newFollowStates[post.postedBy._id] = post.postedBy.followers.includes(response.data._id);
        });
        setFollowStates(newFollowStates);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [posts]);

  const followUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.put(`http://localhost:8080/api/user/follow`, { followId: userId }, config);
      setFollowStates(prevState => ({ ...prevState, [userId]: true }));
    } catch (error) {
      console.error("Error following user:", error.message);
    }
  };

  const unfollowUser = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.put(`http://localhost:8080/api/user/unfollow`, { unfollowId: userId }, config);
      setFollowStates(prevState => ({ ...prevState, [userId]: false }));
    } catch (error) {
      console.error("Error unfollowing user:", error.message);
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
      <div className="grid-container">
        {posts.map((post) => (
          <div className="card" key={post._id}>
            <div className="card-header">
              <div className="user-info">
                {post.postedBy && (
                  <>
                    <div className="user-profile-pic">
                      <img src={post.postedBy.profilePic} alt="User Profile" />
                    </div>
                    <div className="user-profile-info">
                      <h5>{post.postedBy.username}</h5>
                    </div>
                  </>
                )}
              </div>
              <div className="follow-button">
                {post.postedBy && (
                  <>
                    {followStates[post.postedBy._id] ? (
                      <button className="btn-fol" onClick={() => unfollowUser(post.postedBy._id)}>Following</button>
                    ) : (
                      <button className="btn-fol" onClick={() => followUser(post.postedBy._id)}>Follow</button>
                    )}
                  </>
                )}
              </div>
            </div>
            <Link to={`/post/${post._id}`}>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content.substring(0, 100)}...</p>
              </div>
              <div className="card-img-container">
                <img className="card-img" src={post.image} alt="Post" />
              </div>
              
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Feed;
