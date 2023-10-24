import React, {  useEffect, useState } from 'react';
// import axios from 'axios';
import BlogCard from './BlogCard';

function BlogList( {blogs}) {
  // const [blogs, setBlogs] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  


  // useEffect(() => {
  //   axios.get('http://127.0.0.1:3000/blogs')
  //     .then(response => {
  //       setBlogs(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch(err => {
  //       setError(err);
  //       setIsLoading(false);
  //     });
  // }, []);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div
  //   style={{
  //     margin: '100px ',

  //   }}>
  //     <h1
  //     style={{
  //       color: 'red',

  //     }}>Error: {error.message}</h1></div>;
  // }

  return (
    <div>
      <BlogCard  blogs={blogs} />
    </div>
  );
}

export default BlogList;
