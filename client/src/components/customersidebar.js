import React from 'react'
import { NavLink } from 'react-router-dom'

function CustomerSidebar() {
  return (
    <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
    <div className="user-account-nav user-account-sidebar">
      <div className="user-nav-list">
        <ul>
       

          <li ><NavLink className="trans" to={`/customerdash` }><i className="icon-dashboard3"></i>Dashboard</NavLink></li>
          <li><NavLink className="trans" to={`/customerdash/orders` }><i className="icon-add_shopping_cart"></i>Orders</NavLink></li>
          <li><NavLink className="trans" to={`/customerdash/bookings` }><i className="icon-add_shopping_cart"></i>My Bookings</NavLink></li>
          <li><NavLink className="trans" to={`/customerdash/statements` }><i className="icon-add_shopping_cart"></i>Mpesa Statements</NavLink></li>
          <li><NavLink className="trans" to={`/customerdash/reviews` }><i className="icon-comment2"></i>My Reviews</NavLink></li>
          <li><NavLink className="trans" to={`/customerdash/profile` }><i className="icon-build"></i>Account Settings</NavLink></li>
          <li><NavLink className="trans" to={`/customerdash` }><i className="icon-log-out"></i>Sign out</NavLink></li>

        </ul>
      </div>
    </div>
  </div>
  )
}

export default CustomerSidebar