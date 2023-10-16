import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function Customer({ restaurants }) {
	const [userr, setUserr] = useState(null);
	const [userOrders, setUserOrders] = useState([]);
  
	useEffect(() => {
	  // Fetch user information
	  fetch("/me")
		.then((response) => response.json())
		.then((user) => setUserr(user));
	}, []);
  
	useEffect(() => {
	  // Fetch user's orders when userr changes
	  if (userr) {
		fetch(`/ordersuser/${userr.id}`)
		  .then((response) => response.json())
		  .then((orders) => setUserOrders(orders));
	  }
	}, [userr]);

if (userr) {
	
	if (userr.user_type !== "customer") {
		window.location.href = "../";
	  }
}
  return (
    <>
	 {userr && (
    	<div className="main-section">

			{/* user header */}
			<CustomerHeader userr ={userr} />
	
			<div className="page-section account-header buyer-logged-in">
				<div className="container">
					<div className="row">
						
                        
                        {/* user sidebar */}
                        
                        <CustomerSidebar />
              
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
							<div className="user-dashboard">
								<div className="user-holder">
									<div id="close-me" className="user-message" style={{ backgroundColor: '#1e73be' }}>
										<a className="close close-div" href="#"><i className="icon-cross-out"></i></a>
										<h2>Welcome to your account</h2>
										<p>My Account gives you quick access to settings and tools for managing your Account like [Change address] and [Change password] . You can [manage Orders] Booking, and access even more [Shortlists] and [Statements] and may more.</p>
									</div>
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="user-suggest-list listing simple">
												<div className="element-title">
													<h5>Suggested Restaurants</h5>
													<span>Define <em data-target="#suggestions-box" data-toggle="modal">Search criteria</em> to search for specific</span>
												</div>
												<ul className="user-suggest-list-holder">
													

													
											
											{/* ############################### User Dashboard #############################3 */}
											
											
												{restaurants.map((restaurant) => (
  
  <li>
  <div key={restaurant.id} className="img-holder">
	  <figure>
		  <a href="#"><img src={`assets/extra-images/${restaurant.image}`} className="img-list wp-post-image" alt="#"/> </a>
	  </figure>
	  <span className={`restaurant-status ${restaurant.status}`}><em className="bookmarkRibbon"></em>{restaurant.status}</span>
  </div>
  <div className="text-holder">
  <div className="list-rating">
		  <div className="rating-star">
			  <span className="rating-box"  style={{ width: '100%' }}></span>
		  </div>
		  <span className="reviews">(1)</span>
	  </div>
	  <div className="post-title">
		  <h5>
			  <a href="1">{restaurant.name}</a>
		  </h5>
	  </div>
	  <span className="post-categories"><span>Type of food :
		  </span> Apple
		  Juice, Carrot Juice, Ice Cream</span>
	  <div className="delivery-potions">
  
		  <div className="post-time">
			  <i className="icon-clock4"></i>
			  <div className="time-tooltip">
				  <div className="time-tooltip-holder"> <b className="tooltip-label">Preparing Time</b> <b className="tooltip-info">Estimated Cook Time
						  15 minutes.</b> </div>
			  </div>
		  </div>
	  </div>
  </div>
  <div className="list-option">
	  <a href="#" className="shortlist-btn" data-toggle="modal" data-target="#sign-in">
		  <i className="icon-heart-o"></i> 
	  </a>
	
	  <NavLink className="viewmenu-btn text-color" to={`../restaurants/${restaurant.id}`}>
	  View Menu
                                                        </NavLink>
	 
  </div>
</li>
))}
												
												</ul>
											</div>
											<ul className="pagination">
												<li className="active"><a>1</a></li>
												<li><a href="#">2</a></li>
												<li><a href="#">3</a></li>
												<li><span className="page-numbers dots">…</span></li>
												<li><a href="#">24</a></li>
												<li><a href="#">Next </a></li>
											</ul>
										</div>
									</div>
							
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	 )}
    </>
  )
}

export default Customer