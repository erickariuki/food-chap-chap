import React from 'react'
import { NavLink } from 'react-router-dom'

function AdminSidebar() {
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div className="user-account-nav user-account-sidebar">
        <div className="user-nav-list">
            <ul>
                <li ><NavLink className="trans" to={`/admindash` }><i className="icon-dashboard3"></i>Dashboard</NavLink></li>
                <li ><NavLink className="trans" to={`/admindash/restaurants` }><i className="icon-dashboard3"></i>Restaurants</NavLink></li>
                <li ><NavLink className="trans" to={`/admindash/foods` }><i className="icon-dashboard3"></i>Foods</NavLink></li>
                <li ><NavLink className="trans" to={`/admindash/addfood` }><i className="icon-dashboard3"></i>Add Foods</NavLink></li>
                <li ><NavLink className="trans" to={`/admindash/bookings` }><i className="icon-dashboard3"></i>Bookings</NavLink></li>
                <li ><NavLink className="trans" to={`/admindash/reviews` }><i className="icon-dashboard3"></i>Reviews</NavLink></li>
                <li ><NavLink className="trans" to={`/admindash/settlements` }><i className="icon-dashboard3"></i>Settlements</NavLink></li>
                <li ><NavLink className="trans" to={`/admindash/password` }><i className="icon-dashboard3"></i>Change Password</NavLink></li>
                <li><a className="logout-btn" href="#"><i className="icon-log-out"></i>Signout</a></li>
            </ul>
        </div>
    </div>
</div>
  )
}

export default AdminSidebar