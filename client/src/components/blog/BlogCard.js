import '../blog/css/BlogList.css';
import thumbsUpIcon from '../assets/thumbs.png';
import profilepic from '../assets/profilepic.png';
import { Link } from 'react-router-dom';


function BlogCard({ blogs }) {
  return (
    <div>
      <h3 className='header'>Featured posts</h3>
      <div className='blogs-card-container'>
        {blogs.map(blog => (
          <div key={blog.id} className='blog-card'>
            <div className='blog-details'> 
                      <h4 className='blog-title'>{blog.title}</h4>
                      <div className='user-profile'>
                            <li className='user-profile-pic'>
                              <Link to={`/blogprofile/${blog.user.id}`}>
                                <img
                                  src={profilepic}
                                  alt={blog.user.username}
                                  className='profile-pic'
                                />
                              </Link>
                            </li>
                            <div className='user-profile-info'>
                              <h5>{blog.user.username}</h5>
                            </div>
            </div>
                      {/* Display only the first 7 words of the content */}
                      <p className='blog-content'>{truncateText(blog.content, 7)}</p>
                      
                      <button className='see-more-button'>
                          <Link  to={`/blog/fullcontent/${blog.id}`}   className='see-more-button'>
                          see more
                          </Link>
                      </button>
                      
                      <button className='blog-button-category'>{blog.category}</button>
                     
             </div>
             <div className='image-blog'>
                <img src={blog.image_url} alt={blog.title} className='blog-image' />
                
                <div className='blog-info'>
                  <div className='blog-likes'>
                    <img src={thumbsUpIcon} alt='Thumbs Up' className='thumbs-up-icon' />
                    {blog.likes}
                  </div>
                  <p className='blog-dislikes'>{blog.dislikes} Dislikes</p>
                </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}

// Function to truncate text to a specified number of words
function truncateText(text, numWords) {
  const words = text.split(' ');
  if (words.length <= numWords) {
    return text;
  }
  const truncatedWords = words.slice(0, numWords);
  return `${truncatedWords.join(' ')}...`;
}

export default BlogCard;