import { useState, useEffect } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../../components/Post/Post";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.user); // Use your user state management logic here
  const [userPosts, setUserPosts] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileResponse = await axios.get(`/api/users/${id}`);
        const userPostsResponse = await axios.get(`/api/posts/user/${id}`);

        setUserProfile(userProfileResponse.data);
        setUserPosts(userPostsResponse.data.posts);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleFollow = async () => {
    try {
      const response = await axios.post(`/api/users/${id}/follow`, {
        userId: currentUser._id, // Replace with the appropriate logic to get the current user's ID
      });
    } catch (err) {
      console.error("Error following/unfollowing user:", err);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            <img
              src={userProfile?.profilePicture} // Assuming your user schema has a field called profilePicture
              alt="Profile Picture"
              className="w-12 h-12 rounded-full"
            />
            {currentUser._id !== id && (
              <button
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                onClick={handleFollow}
              >
                {/* Replace with your follow/unfollow logic */}
              </button>
            )}
          </div>
          <div className="mt-6">
            {userPosts.map((post) => (
              <div className="p-2" key={post._id}>
                <Post post={post} setData={setUserPosts} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {open && <EditProfile setOpen={setOpen} />}
    </>
  );
};

export default Profile;

