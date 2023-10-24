import { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import { useSelector } from "react-redux";
import axios from "axios";

const CreatePost = () => {
  const [postText, setPostText] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the user is authenticated
      if (!currentUser) {
        console.log("User not authenticated. Please log in.");
        return;
      }

      // Create a new tweet
      const response = await axios.post("/api/posts/createpost", {
        userId: currentUser._id,
        text: postText,
      });

      // Handle successful tweet creation (you can update UI accordingly)
      console.log("Tweet created successfully:", response.data);
      // Reload tweets or update state to refresh the timeline
    } catch (err) {
      // Handle errors (e.g., display error message to the user)
      console.error("Error creating tweet:", err);
    }
  };

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setPostText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Post
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default CreatePost;
