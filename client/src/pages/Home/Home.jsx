import { useEffect, useState } from "react";
import axios from "axios";
// import Signin from "../Signin/Signin";
import { useSelector } from "react-redux";
import CreatePost from "../../components/CreatePost/CreatePost";

const Home = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts"); // Replace with your API endpoint to fetch tweets
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching tweets:", error);
      }
    };

    if (currentUser) {
      fetchPosts();
    }
  }, [currentUser]);

  return (
    <>
      
        <div className="px-6">
          <CreatePost posts={posts} />
        </div>
    </>
  );
};

export default Home;
