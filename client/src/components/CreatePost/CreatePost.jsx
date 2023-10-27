import React, { useState } from 'react';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import UploadIcon from '@mui/icons-material/Upload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './createpost.css';

export default function CreatePost() {
  const [postData, setPostData] = useState({
    title: "",
    body: "",
    pic: "",
  });

  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [videoPreview, setVideoPreview] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post("/api/posts/createpost", postData);
    console.log("Post created:", response.data);
    // Handle success, e.g., show a success message to the user
    } catch (error) {
    console.error("Error creating post:", error);
    // Handle error, e.g., show an error message to the user
    }
  };
    

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleVideoChange = (event) => {
    const selectedVideo = event.target.files[0];
    setVideo(selectedVideo);
    setVideoPreview(URL.createObjectURL(selectedVideo));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('body', postData.body);
      formData.append('pic', postData.pic);
      formData.append('file', file);
      formData.append('file2', video);

      const response = await axios.post("/api/posts/createpost", formData);
      console.log("Post created:", response.data);
      // Handle success, e.g., show a success message to the user
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <div className='ContentUploadContainer'>
        <div>
          <h2>Create a New Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={postData.title}
              onChange={handleInputChange}
            />
            <textarea
              name="body"
              placeholder="Post Content"
              value={postData.body}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="pic"
              placeholder="Image URL"
              value={postData.pic}
              onChange={handleInputChange}
            />
          </form>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className='OtherIcons'>
              <label htmlFor='file'>
                <AddPhotoAlternateIcon className="icons" />
                <input type="file" name="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
              </label>
              <EmojiEmotionsIcon className="icons" />
              <label htmlFor='file2'>
                <UploadIcon className="icons" />
                <input type="file" name="file2" id="file2" style={{ display: "none" }} onChange={handleVideoChange} />
              </label>
            </div>
            <button style={{ height: "30px", marginRight: "12px", marginTop: "40px", paddingLeft: "20px", paddingRight: "20px", paddingTop: 6, paddingBottom: 6, border: "none", backgroundColor: "black", color: "white", borderRadius: "5px", cursor: "pointer" }} onClick={handlePost}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
}

