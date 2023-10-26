import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { MoreVert } from "@mui/icons-material";
import "./post.css";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/posts/UserProfile/${user.username}`);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [user.username]);

  const likeHandler = async () => {
    try {
      await axios.put(`http://localhost:8080/api/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.error(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? `${PF}${user.profilePicture}`
                    : `${PF}person/noAvatar.png`
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          {post.pic && <img className="postImg" src={`${PF}${post.pic}`} alt="" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className={`likeIcon ${isLiked ? "liked" : ""}`}
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className={`likeIcon ${isLiked ? "liked" : ""}`}
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} {like === 1 ? 'person' : 'people'} like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.replies.length} {post.replies.length === 1 ? 'comment' : 'comments'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

