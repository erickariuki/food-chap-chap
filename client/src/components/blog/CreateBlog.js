import React, { useState } from 'react';
import '../blog/css/CreateBlog.css';
import TextEditor from './TextEditor';
import Swal from 'sweetalert2';

const CreateBlogForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    Category: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define a separate function to handle the content change
  const handleContentChange = (value) => {
    setFormData({
      ...formData,
      content: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful POST request, show a success alert
        Swal.fire({
          title: 'Success!',
          text: 'Blog post created successfully',
          icon: 'success',
        });

        // Clear the form fields after successful submission
        setFormData({
          title: '',
          content: '',
          Category: '',
        });
      } else {
        // Handle errors here (e.g., show an error message).
        console.error('Failed to create a blog post');

        // Use response.statusText to get the error message from the server
        Swal.fire({
          icon: 'error',
          title: 'Oops, something went wrong',
          text: response.statusText, // Display the error message from the server
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            className="input-field"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="content">
            Content:
          </label>
          <TextEditor value={formData.content} onChange={handleContentChange} />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="Category">
            Category:
          </label>
          <input
            className="input-field"
            type="text"
            id="Category"
            name="Category"
            value={formData.Category}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
