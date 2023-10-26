import React, { useContext, useRef, useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./createpost.css";

export default function Share() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCancelFile = () => {
    setFile(null);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    try {
      // Create a new post using your API endpoint
      const response = await axios.post("/api/posts/createpost", newPost);
      const createdPost = response.data;

      // If a file is selected, upload it
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        // Use the post ID returned from the API as the filename
        const fileName = createdPost._id + "_" + file.name;
        formData.append("name", fileName);

        // Upload the file
        await axios.post("/api/posts/upload", formData);
        // Update the post's pic field with the filename
        await axios.put(`/api/posts/${createdPost._id}`, { pic: fileName });
      }

      // Clear the input fields and file state
      desc.current.value = "";
      setFile(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"}
            alt=""
          />
          <input
            placeholder={`What's on your mind, ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImageContainer">
            <img className="shareImage" src={URL.createObjectURL(file)} alt="shared" />
            <Cancel className="shareCancelImage" onClick={handleCancelFile} />
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
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}
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
              <span className="shareOptionText">Feeling</span>
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

