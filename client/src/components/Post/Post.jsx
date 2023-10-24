import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import formatDistance from "date-fns/formatDistance";

const Post = ({ post, setData }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;
  const { id } = useParams();
  const dateStr = formatDistance(new Date(post.createdAt), new Date());

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}`);
        setCurrentUser(response.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleLike = async () => {
    try {
      await axios.put(`/api/posts/${post._id}/like`, {
        userId: currentUser._id,
      });

      if (location.includes("profile")) {
        const response = await axios.get(`/api/posts/user/${id}`);
        setData(response.data.posts);
      } else if (location.includes("explore")) {
        const response = await axios.get(`/api/posts/explore`);
        setData(response.data.posts);
      } else {
        const response = await axios.get(`/api/posts/timeline/${currentUser._id}`);
        setData(response.data.posts);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{post.description}</p>
          <button onClick={handleLike}>
            {post.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 cursor-pointer" />
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer" />
            )}
            {post.likes.length}
          </button>
        </>
      )}
    </div>
  );
};

export default Post;

