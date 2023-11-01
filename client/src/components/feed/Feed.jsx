import React, { useEffect, useState } from "react";
import axios from "axios";
import './feed.css'
import CreatePost from '../CreatePost/CreatePost'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followStates, setFollowStates] = useState({}); // State to store follow status of each user
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts");
        if (Array.isArray(response.data.posts)) { // Ensure the data is an array
          setPosts(response.data.posts);
          // Initialize followStates with false for each user
          const newFollowStates = {};
          response.data.posts.forEach(post => {
            newFollowStates[post.author] = false;
          });
          setFollowStates(newFollowStates);
        } else {
          console.error("Error: fetched data is not an array");
        }
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchPosts();
  }, []);
  
  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${user._Id}`)
      .then(response => response.json())
      .then(data => setUser(data));
  }, []);// Empty dependency array ensures useEffect runs once after initial render

  // Function to follow a user
  const followUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/follow/${userId}`);
      setFollowStates(prevState => ({ ...prevState, [userId]: true }));
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  // Function to unfollow a user
  const unfollowUser = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/unfollow/${userId}`);
      setFollowStates(prevState => ({ ...prevState, [userId]: false }));
    } catch (error) {
      console.error("Error unfollowing user:", error);
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
        <CreatePost />
      </div>
      {posts.map((post) => (
        <div className="card" key={post._id}>
          <div className="card-header">
          <AccountCircleIcon/>
          <span className="user">
            <small>Posted by: <a href={`/profile/${post.author}`}>{post.author}</a></small>
            {followStates[post.author] ? (
              <button className="btn-fol" onClick={() => unfollowUser(post.author)}>Unfollow</button>
            ) : (
              <button className="btn-fol" onClick={() => followUser(post.author)}>Follow</button>
            )}
            </span>
          </div>
          <div style={{display:'flex', alignItems:'center'}}>
            
          {/* <img src={user?.profilePic} className="profileimage" alt="" /> */}
          <h3 style={{marginLeft:'10px'}}>{user?.username}</h3>
        </div>
          <img className="card-img" src={post.image} alt="Post" />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.content}</p>
          </div>
          <div className="MoreIcons">
            <button className="btn">
              <FavoriteBorderIcon />
            </button>
            <button className="btn">
              <BookmarkIcon />
            </button>
            <button className="btn">
              <ShareIcon />
            </button>
          </div>

          <a href="blog-detail.html" className="read-more text-color">Learn more <i className="icon-arrow-right22"></i></a>
          
        </div>
      ))}


    </div>

  );
}

export default Feed;


