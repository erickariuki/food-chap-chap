import React from "react";

const Post = ({ posts }) => {
  if (!Array.isArray(posts)) {
    // Handle the case where posts is not an array (could be an object or null)
    return <div>No posts to display.</div>;
  }

  return (
    <div>
      {posts.map((val) => (
        <div key={val._id}>
          <h3>{val.title}</h3>
          <p>{val.body}</p>
          {val.pic && <img src={val.pic} alt="Post" />}
          <h4>Likes: {val.likes.length}</h4>
          <h4>Comments:</h4>
          <ul>
            {val.comments.map((comment, index) => (
              <li key={index}>{comment.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Post;


