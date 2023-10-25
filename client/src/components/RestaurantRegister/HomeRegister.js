import React from 'react'
import { Link } from 'react-router-dom'

function HomeRegister() {
  return (
    <div>
        <h1>Join us at FoodChapChap to unclock your restaurant potential</h1>
        <p>Are you tired of the everyday dining frustrations at your restaurant?
             We understand the challenges you face, and we have a solution that can change 
             the game for you. FoodChapChap is your gateway to a new era of restaurant service, 
             focused on convenience, simplicity, and efficiency.

</p>
<button>
    <Link to="/register+your=restaurant/create+restaurant=form">
        register restaurant
    </Link>
</button>
    </div>
  )
}

export default HomeRegister