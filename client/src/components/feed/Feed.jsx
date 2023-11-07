import React, { useEffect, useState } from "react";
import axios from "axios";
import './feed.css'

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
        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          const newFollowStates = {};
          response.data.posts.forEach(post => {
            newFollowStates[post.author] = false;
          });
          setFollowStates(newFollowStates);
          // Check if the posts array is not empty
          if (response.data.posts.length > 0) {
            // Check if the author field is not undefined
            if (response.data.posts[0].author) {
              // Set the user state with the user's ID
              setUser(prevUser => ({ ...prevUser, _id: response.data.posts[0].author }));
            } else {
              console.error("Error: author field is undefined");
            }
          } else {
            console.error("Error: posts array is empty");
          }
        } else {
          console.error("Error: fetched data is not an array");
        }
        setLoading(false);
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
  
    // Add interceptor for 401 errors
    axios.interceptors.response.use(
      response => response, // simply return the response if it was successful
      error => {
        if (error.response) {
          if (error.response.status === 403) {
            console.log('Forbidden');
            // You can add your logic here to handle the 403 error
          }
        }
        return Promise.reject(error);
      }
    );
    
    fetch(`http://localhost:8080/api/user`, config)
      .then(response => response.json())
      .then(data => setUser(data));
  }, []);
  
  // Empty dependency array ensures useEffect runs once after initial render
  // Empty dependency array ensures useEffect runs once after initial render
  // const userId = ${user._Id}
  console.log(user, "This is user")

  // Function to follow a user
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

  // Function to unfollow a user
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
              <AccountCircleIcon />
              <span className="user">
                <small>Posted by: <a href={`/profile/${post.postedBy}`}>{post.postedBy}</a></small>
                {followStates[post.postedBy] ? (
                  <button className="btn-fol" onClick={() => unfollowUser(post.postedBy)}>Following</button>
                ) : (
                  <button className="btn-fol" onClick={() => followUser(post.postedBy)}>Follow</button>
                )}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>

              {/* <img src={user?.profilePic} className="profileimage" alt="" /> */}
              <h3 style={{ marginLeft: '10px' }}>{user?.username}</h3>
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


    </div>

  );
}

export default Feed;


