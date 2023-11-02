import React, { useState } from 'react';
import axios from 'axios';
import './createpost.css';
import ImageIcon from '@mui/icons-material/Image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const [title, setTitle] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();

    if (file !== null && title.trim() !== '') {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      // Add other fields like 'postedBy', etc., to the formData if needed.

      try {
        const response = await axios.post('http://localhost:8080/api/posts/createpost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log(response.data);
        // Handle success, e.g., show a success message to the user.
      } catch (error) {
        console.error('Error creating post:', error);
        // Handle errors, e.g., show an error message to the user.
      }
    } else {
      // Handle validation errors, e.g., show a validation error message to the user.
      console.error('Please select an image and provide a title for the post.');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior to allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setFile(file);
      setImagePre(URL.createObjectURL(file));
    }
  };

  return (
    <div className='ContentUploadContainer' onDragOver={handleDragOver} onDrop={handleDrop}>
      <div style={{ display: "flex", alignItems: "center", padding: 10 }}>
        <AccountCircleIcon className="profileimage" alt="" />
        <input type="text" className='contentWritingpart' placeholder='Write your real thought.....' onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div style={{ marginLeft: '10px' }}>
        {imagePre !== null ? <img src={imagePre} style={{ width: "410px", height: '250px', objectFit: "cover", borderRadius: '10px' }} alt="" /> : ''}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <label htmlFor='file'>
              <ImageIcon className="icons" alt="" />
              <input type="file" name="file" id="file" style={{ display: "none" }} onChange={(e) => [setFile(e.target.files[0]), setImagePre(URL.createObjectURL(e.target.files[0]))]} />
            </label>
          </div>
          <button className='button' onClick={handlePost}>Post</button>
        </div>
      </div>
    </div>
  );
}
