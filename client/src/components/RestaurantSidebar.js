import React from 'react'
import { NavLink } from 'react-router-dom'

function RestaurantSidebar() {
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div className="user-account-nav user-account-sidebar">
        <div className="user-nav-list">
            <ul>
                <li ><NavLink className="trans" to={`/restaurantdash` }><i className="icon-dashboard3"></i>Dashboard</NavLink></li>
                <li ><NavLink className="trans" to={`/restaurantdash/profile` }><i className="icon-dashboard3"></i>My Restaurant</NavLink></li>
                <li ><NavLink className="trans" to={`/restaurantdash/foods` }><i className="icon-dashboard3"></i>Foods</NavLink></li>
                <li ><NavLink className="trans" to={`/restaurantdash/addfood` }><i className="icon-dashboard3"></i>Add Foods</NavLink></li>
                <li ><NavLink className="trans" to={`/restaurantdash/bookings` }><i className="icon-dashboard3"></i>Bookings</NavLink></li>
                <li ><NavLink className="trans" to={`/restaurantdash/reviews` }><i className="icon-dashboard3"></i>Reviews</NavLink></li>
                <li ><NavLink className="trans" to={`/restaurantdash/settlements` }><i className="icon-dashboard3"></i>Settlements</NavLink></li>
                <li ><NavLink className="trans" to={`/restaurantdash/password` }><i className="icon-dashboard3"></i>Change Password</NavLink></li>
                <li><a className="logout-btn" href="#"><i className="icon-log-out"></i>Signout</a></li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default RestaurantSidebar