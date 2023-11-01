import React, { useState } from 'react';
import axios from 'axios';
import './createpost.css';
import ImageIcon from '@mui/icons-material/Image';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ContentPost() {
  const [file, setFile] = useState(null);
  const [imagePre, setImagePre] = useState(null);
  const [title, setTitle] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();

    if (file !== null) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://localhost:8080/api/posts/createpost', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  return (
    <div className='ContentUploadContainer'>
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
