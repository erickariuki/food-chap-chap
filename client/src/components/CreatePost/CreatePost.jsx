import React, { useState } from 'react';
import axios from 'axios';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import UploadIcon from '@mui/icons-material/Upload';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './createpost.css';

export default function CreatePost() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);
  const [title, setTitle] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
  };

  const handleVideoChange = (event) => {
    const selectedVideo = event.target.files[0];
    setFile2(selectedVideo);
    setVideoPreview(URL.createObjectURL(selectedVideo));
  };

  const handlePost = async (e) => {
    e.preventDefault();
  
    // Check if user is null
    if (!user || !user.accessToken) {
      // Handle the case where user is null or accessToken is missing
      console.error('User data or access token is missing.');
      // You can redirect to the login page or display an error message here
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    if (file) {
      formData.append('image', file);
    }
    if (file2) {
      formData.append('video', file2);
    }
  
    try {
      const accessToken = user.accessToken;
      await axios.post('http://localhost:5000/api/posts/createpost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'token': accessToken
        }
      });
      console.log(formData);
      alert('Your Post was uploaded successfully');
      window.location.reload(true);
    } catch (error) {
      console.error('Error occurred while uploading the post:', error);
    }
  }
  return (
    <div>
      <div className='ContentUploadContainer'>
        <div style={{ display: "flex", alignItems: "center", padding: 10, mt: [100] }}>
          <AccountCircleIcon className="profileimage" />
          {/* <span className='username'>${users.username}</span> */}
          <input type="text" className='contentWritingpart' placeholder='Write your real thought.....' onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div style={{ marginLeft: '10px' }}>
          {imagePreview !== null ? <img src={imagePreview} style={{ width: "410px", height: '250px', objectFit: "cover", borderRadius: '10px' }} alt="" /> : videoPreview !== null ? <video className="PostImages" width="500" height="500" controls >
            <source src={videoPreview} type="video/mp4" />
          </video> : ''
          }
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
