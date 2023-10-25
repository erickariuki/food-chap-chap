import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function Header({user, onLogout}) {

	function handleLogout() {
		fetch("/logout", {
		  method: "DELETE",
		}).then(() => onLogout());
	  }	
			let location = process.env.PUBLIC_URL;


		if(user && user.user_type) {	
	  if (user.user_type === "customer") {
		location = `${process.env.PUBLIC_URL}/customerdash`;
	  } else if (user.user_type === "restaurant_owner") {
		location = `${process.env.PUBLIC_URL}/restaurantdash`;
	  } else if (user.user_type === "admin") {
		location = `${process.env.PUBLIC_URL}/admindash`;
	  }
	}

  return (
<>
<header id="header" className="sticky-header header-full-width transparent-header fancy">
			<div className="main-header">
				<div className="wide">
					<div className="nav-left wow fadeOutLeft" data-wow-duration="2s" style={{marginTop: '3px'}}>
						<div className="main-nav">
							<nav id="site-navigation" className="main-navigation">
								<ul className="fancy-left-menu">
						
								

								<li><NavLink className="trans" to={`${process.env.PUBLIC_URL}` }>
									Home
                                                        </NavLink></li>

									<li><NavLink className="trans" to={`${process.env.PUBLIC_URL}/restaurants` }>
									Restaurants
                                                        </NavLink></li>

									<li><a href="/blogs">Blogs</a>
									</li>
									
								</ul>
							</nav>
						</div>
					</div>
					<div className="logo">
						<figure>
							<a href="foodstop.html" className="light-logo">
								<img src="assets/extra-images/logonew.png" alt="Food Stop"/>
							</a>
							<a href="foodstop.html" className="dark-logo">
								<img src="assets/extra-images/logonew.png"  alt="Food Stop"/>
							</a>
						</figure>
					</div>
					<div className="nav-right wow fadeOutRight" data-wow-duration="2s"  style={{marginTop: '3px'}}>
						<div className="main-nav">
							<nav className="main-navigation">
								<ul className="fancy-right-menu">
									<li><a href="/contactus">Contact Us</a>
									</li>


									{/* data  */}

									{user ? (
    <>
					
					




					<li ><NavLink className="get-start-btn btn btn-sm" style={{
    backgroundColor: 'rgb(89, 195, 50)',
    borderRadius: '3px',
    color: '#fff',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0',
    lineHeight: 'normal',
    padding: '10px 15px',
    textTransform: 'uppercase',
    margin: '0 0 0 12px',
  }}to={`${location}`}>{user.username}: {user.user_type}</NavLink></li>


						

						<li><a className="get-start-btn btn btn-sm" onClick={handleLogout} style={{
    backgroundColor: '#c33332',
    borderRadius: '3px',
    color: '#fff',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0',
    lineHeight: 'normal',
    padding: '10px 15px',
    textTransform: 'uppercase',
    margin: '0 0 0 12px',
  }} >Logout</a>
									</li>
    </>
      ) : (
        <>
              <li><a className="cs-color cs-popup-joinus-btn login-popup" data-target="#sign-in" data-toggle="modal" href="#user-register" style={{color: "#e51b1b"}}>Login / Register</a>
									</li>
									<li><a className="get-start-btn btn btn-sm" data-target="#sign-in" data-toggle="modal" href="register+your=restaurant"  style={{
    backgroundColor: '#c33332',
    borderRadius: '3px',
    color: '#fff',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '12px',
    fontWeight: '700',
    letterSpacing: '0',
    lineHeight: 'normal',
    padding: '10px 15px',
    textTransform: 'uppercase',
    margin: '0 0 0 12px',
  }} >Register Restaurant</a>
									</li>
        </>
      )}

									
								</ul>
							</nav>
						</div>
					
					</div>
				</div>
			</div>
		</header>
</>
  )
}

export default Header