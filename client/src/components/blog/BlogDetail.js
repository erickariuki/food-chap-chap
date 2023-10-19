import React from 'react';
import { useParams } from 'react-router-dom';
import '../blog/css/BlogDetail.css';

const BlogDetail = ({ blogs }) => {
  const { id } = useParams();
      
  // Find the blog with the matching 'id' in the 'blogs' array
  const blog = blogs.find((blog) => blog.id.toString() === id);

  // Check if a matching blog was found
  if (!blog) {
    return <div className="blog-container">Blog not found for ID: {id}</div>;
  }

  return (
    <div className="blog-container">
        <h1>blogs full content</h1>
      <h1 className="blog-title">{blog.title}</h1>
      <p className="blog-content">{blog.content}</p>
      <p className="blog-details">Author: {blog.author}</p>
      <p className="blog-details">Category: {blog.category}</p>
      <img
        src={blog.image_url} // Assuming 'image_url' is the URL of the blog's image
        alt={blog.title} // Provide alt text for accessibility
        className="blog-image"
      />
      {/* Add more details as needed */}
    </div>
  );
};

export default BlogDetail;
