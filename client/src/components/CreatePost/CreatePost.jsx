import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
 const [postData, setPostData] = useState({ title: '', body: '' });
 const [postLink, setPostLink] = useState('');

 const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/api/posts/createpost', postData);
    setPostLink(response.data.link);
  } catch (error) {
    console.error('Error creating post', error);
  }
 };

 return (
  <div>
    <form onSubmit={handleSubmit}>
      <input type="text" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} placeholder="Title" />
      <textarea value={postData.body} onChange={(e) => setPostData({ ...postData, body: e.target.value })} placeholder="Body" />
      <button type="submit">Create Post</button>
    </form>
    {postLink && <div>Post created at: {postLink}</div>}
  </div>
 );
};

export default CreatePost;
