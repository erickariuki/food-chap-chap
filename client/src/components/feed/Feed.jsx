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
        if (Array.isArray(response.data.posts)) {
          setPosts(response.data.posts);
          const newFollowStates = {};
          response.data.posts.forEach(post => {
            newFollowStates[post.author] = false;
          });
          setFollowStates(newFollowStates);
          // Set the user state with the user's ID
          setUser(prevUser => ({ ...prevUser, _Id: response.data.posts[0].author }));
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
    fetch(`http://localhost:8080/api/user`, config)
      .then(response => response.json())
      .then(data => setUser(data));
  }, []);
   // Empty dependency array ensures useEffect runs once after initial render
    // Empty dependency array ensures useEffect runs once after initial render
    // const userId = ${user._Id}
   console.log(user , "This is user")
   
  // Function to follow a user
  const followUser = async (userId) => {
    const token = localStorage.getItem('token'); // replace 'token' with the key you used to store the token
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
      
    };
    try {
      const response = await axios.put(`http://localhost:8080/api/user/follow`, null, config);
      // handle success
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
   };
   
  
  



  // Function to unfollow a user
  const unfollowUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      await axios.put(`http://localhost:8080/api/user/unfollow`, {}, config);
      setFollowStates(prevState => ({ ...prevState, [`${user._id}`]: false }));
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
        <CreatePost />
      </div>
      <div className="grid-container">
        {posts.map((post) => (
          <div className="card" key={post._id}>
            <div className="card-header">
              <AccountCircleIcon />
              <span className="user">
                <small>Posted by: <a href={`/profile/${post.postedBy}`}>{post.postedBy}</a></small>
                {followStates[post.author] ? (
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


