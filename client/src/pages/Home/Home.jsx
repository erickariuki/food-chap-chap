import { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "../../components/CreatePost/CreatePost";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { id } from "date-fns/locale";

const Home = () => {
  const [currentUser, setCurrentUser] = useState(id);
  const [posts, setPosts] = useState(id);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setShowLoginForm(false);
    setShowRegisterForm(false);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userResponse = await axios.get(`/api/users/${currentUser.id}`);
        setCurrentUser(userResponse.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get(`/api/posts/${posts.id}`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (currentUser) {
      fetchPosts();
    } else {
      fetchCurrentUser();
    }
  }, [currentUser]);

  return (
    <div className="px-6">
      {showLoginForm && <LoginForm onLogin={handleLogin} />}
      {showRegisterForm && <RegisterForm onLogin={handleLogin} />}
      {currentUser && <CreatePost posts={posts} />}
    </div>
  );
};

export default Home;
