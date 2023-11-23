import React from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { VscComment } from 'react-icons/vsc';
import { FiSend } from 'react-icons/fi';
import { BsBoomark } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import profile from './profile.jpg';
import burger from './burger.jpg';
import './post.css'

const Post = () => {
  return (
    <div>
      <div className='post-container'>
        <div className='profile-details'>
          <img src={profile} className='profile-img' />
          <span>Username</span>
        </div>
        <FiMoreHorizontal className='more' />
      </div>
      <div className='post-details'>
        <img src={burger} className='post-image'/>
      </div>
    </div>
  )
}

export default Post;