import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import FileBase from 'react-file-base64';
import './createpost.css'

const Form = ({ posts }) => {
 const [postData, setPostData] = useState({ title: '', body: '', pic: '' });
 const [userData, setUserData] = useState({ username: '', profilePic: '' });
 const [preview, setPreview] = useState('');

 useEffect(() => {
   fetch('http://localhost:8080/api/user')
     .then(response => response.json())
     .then(data => setUserData(data))
     .catch(error => console.error('Error:', error));

   if (posts && posts._id) {
     fetch(`http://localhost:8080/api/posts/${posts._id}`)
       .then(response => response.json())
       .then(data => setPostData(data))
       .catch(error => console.error('Error:', error));
   }
 }, [posts]);

 const clear = () => {
   setPostData({ title: '', body: '', pic: '' });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   if (posts && !posts._id) {
     fetch('http://localhost:8080/api/posts/createpost', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(postData),
     })
       .then(response => response.json())
       .then(data => {
         console.log('Success:', data);
         clear();
       })
       .catch((error) => {
         console.error('Error:', error);
       });
   } else if (posts && posts._id) {
     fetch(`http://localhost:8080/api/posts/updatepost/${posts._id}`, {
       method: 'PUT',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(postData),
     })
       .then(response => response.json())
       .then(data => {
         console.log('Success:', data);
         clear();
       })
       .catch((error) => {
         console.error('Error:', error);
       });
   }
 };

 const handleProfileClick = () => {
   window.location.href = `/user/${userData._id}`;
 };

 return (
   <form className="form" onSubmit={handleSubmit}>
     <div className="user-info" onClick={handleProfileClick}>
       <img src={userData.profilePicture} alt="Profile" />
       <h2>@{userData.name}</h2>
     </div>
     <h1>{posts && posts._id ? `Editing "${postData.title}"` : 'Create Your Own Post'}</h1>
     <TextField label="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
     <TextField label="Message" multiline rows={4} value={postData.body} onChange={(e) => setPostData({ ...postData, body: e.target.value })} />
     <div>
       <FileBase type="file" multiple={false} onDone={({ base64 }) => {
         setPostData({ ...postData, pic: base64 });
         setPreview(base64);
       }} />
     </div>
     {preview && <img src={preview} alt="Preview" />}
     <div className="button-container">
       <Button className='sub' type="submit">Submit</Button>
     </div>
   </form>
 );
};

export default Form;
