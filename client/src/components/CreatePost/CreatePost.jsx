import "./createpost.css";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Check if user exists before rendering the component
  if (!user) {
    return null; // or display a loading spinner or a message indicating that the user is not logged in
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    try {
      // Create a new post using your API endpoint
      const response = await axios.post("/api/posts", newPost);
      const createdPost = response.data;

      // If a file is selected, upload it
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        // Use the post ID returned from the API as the filename
        const fileName = createdPost._id + "_" + file.name;
        formData.append("name", fileName);
        
        // Upload the file
        await axios.post("/api/upload", formData);
        // Update the post's img field with the filename
        await axios.put(`/api/posts/${createdPost._id}`, { img: fileName });
      }

      // Reload the page after successful post creation
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  const handleUploadClick = () => {
    setShowModal(true); // Show the modal when upload button is clicked
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={`What's in your mind, ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
