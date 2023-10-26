import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './post.css';

export default function Post({ post }) {
  const [user, setUser] = useState({});
  const [like, setLike] = useState(ThumbUpIcon);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentWriting, setCommentWriting] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    if (post) {
      setCount(post.likes.length);
      setComments(post.comments);
    }
  }, [post]);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users`);
        setUser(response.data);
      } catch (error) {
        console.log("Some error occurred while fetching user details");
      }
    };
    getUserDetails();
  }, [post]);


  const handleLike = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/like`, {}, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (like === ThumbUpIcon) {
        setLike(FavoriteIcon);
        setCount(count + 1);
      } else {
        setLike(ThumbUpIcon);
        setCount(count - 1);
      }
    } catch (error) {
      console.error("Error occurred while handling like:", error);
    }
  };

  const addComment = async () => {
    try {
      const comment = {
        postid: post._id,
        username: user?.username,
        comment: commentWriting,
        profile: user?.profile || ''
      };

      await axios.put(`http://localhost:5000/api/posts/comment`, comment, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setComments([...comments, comment]);
    } catch (error) {
      console.error("Error occurred while adding comment:", error);
    }
  };

  const handleComment = () => {
    addComment();
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  if (!post) {
    return null; // or render a loading state or an error message
  }

  return (
    <div className='PostContainer'>
      <div className='SubPostContainer'>
        <div>
          <div style={{ display: 'flex', alignItems: "center" }}>
            {user?.profile ? <img src={user?.profile} className="PostImage" alt="" /> : <AccountCircleIcon className="PostImage" />}
            <div>
              <p style={{ marginLeft: '5px', textAlign: "start" }}>{user?.username}</p>
              <p style={{ fontSize: "11px", textAlign: "start", marginLeft: 5, marginTop: -13, color: "#aaa" }}>Following by suman</p>
            </div>
            <MoreVertIcon className="moreicons" />
          </div>
          <p style={{ textAlign: 'start', width: "96%", marginLeft: 20, marginTop: 0 }}>{post.title}</p>
          {post.image !== '' ? <img src={post.image} className="PostImages" alt="" /> : post.video !== '' ? <video className="PostImages" width="500" height="500" controls>
            <source src={post.video} type="video/mp4" />
          </video> : ''}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <img src={ThumbUpIcon} className="iconsforPost" onClick={handleLike} alt="" />
                <p style={{ marginLeft: "6px" }}>{count} Likes</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", marginLeft: 20, cursor: "pointer" }}>
                <img src={CommentIcon} className="iconsforPost" onClick={handleShowComments} alt="" />
                <p style={{ marginLeft: "6px" }}>{comments.length} Comments</p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", marginLeft: 200, cursor: "pointer" }}>
              <img src={SendIcon} className="iconsforPost" alt="" />
              <p style={{ marginLeft: "6px" }}>Share</p>
            </div>
          </div>
          {showComments &&
            <div style={{ padding: '10px' }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={user?.profile} className="PostImage" alt="" />
                <input type="text" className='commentinput' placeholder='Write your thought' onChange={(e) => setCommentWriting(e.target.value)} />
                <button className='addCommentbtn' onClick={handleComment}>Post</button>
              </div>
              {comments.map((item, index) => (
                <div key={index} style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.profile === '' ?
                      <img src={`https://images.pexels.com/photos/1126993/pexels-photo-1126993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`} className="PostImage" alt="" /> :
                      <img src={item.profile} className="PostImage" alt="" />}
                    <p style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}>{item.username}</p>
                  </div>
                  <p style={{ marginLeft: "55px", textAlign: 'start', marginTop: -16 }}>{item.comment}</p>
                  <p style={{ marginLeft: "55px", textAlign: 'start', marginTop: -10, color: "#aaa", fontSize: 11 }}>Reply</p>
                </div>
              ))}
            </div>}
        </div>
      </div>
    </div>
  );
}
