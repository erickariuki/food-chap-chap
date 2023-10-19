import React from 'react'
import { Link } from 'react-router-dom'
import BlogList from './BlogList'

import { TypeAnimation } from 'react-type-animation';

import '../blog/css/BlogPage.css'


function BlogPage({blogs}) {
  return (
    <div>
                <div style={{
                  marginTop: '10%',
                  height: '100%',
                  position: 'relative',
                  marginLeft: '20%',
                  fontFamily: 'Poppins',
                  
                }}>
                  <div>
                  <TypeAnimation
  style={{ 
    whiteSpace: 'pre-line',
     height: '250px', 
     display: 'block' ,
     fontSize: '4rem',
     paddingBottom: '10px',
     marginTop: '10px',
    }}
  sequence={[
    `Savor. Share. Repeat: Every meal has a story. 
    \nShare your food tales, and let others savor the flavors of your experiences.
    \nShowcase your expertise, inspire others, and make 
    \nyour mark in the food world
    \n
    `, 
    1000,
  ]}
  repeat={Infinity}
/>
  {/* <TypeAnimation
    preRenderFirstString={true}
    sequence={[
      1000,
      'Hello, Lets explore the best foods recipes and ingredients', // initially rendered starting point
      1000,
      'get the best recipes from our chefs all over the globe',
      1000,
      'view our blogs and others featured by our community',
      1500,
      
    ]}
    speed={30}
    style={{ 
      fontSize: '4em',
      fontSize:'50px',
      paddingTop: '10px',
      width: '80%',
      paddingBottom: '10px',
      color: 'rgb(195, 51, 50)'
     }}
    repeat={Infinity}
  /> */}
 
</div>
                  {/* <h1
                  style={{
                    fontSize:'50px',
                    paddingTop: '10px',
                    width: '70%',
                    paddingBottom: '10px',

                  }}>
                    Hello, Let's explore the best foods recipes and ingredients  </h1>
                  <p>get the best recipes from our chefs all over the globe </p>
                  <p> view our blogs and others featured by our community</p> */}
                  <div>
                        <button  className='blog-button'> 
                              <Link to='/blogs/createblog' >Create a blog</Link>
                        </button>
                  </div>
                </div>
                
                <div>
                  <BlogList blogs={blogs}/>
                </div>
    </div>
  )
}

export default BlogPage