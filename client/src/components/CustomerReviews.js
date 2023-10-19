import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function CustomerReviews({ restaurants }) {
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
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="element-title has-border reviews-header right-filters-row">
												<h5>
													<span>Reviews Given</span>
													<span className="element-slogan">(2)</span>
												</h5>
												<div className="right-filters row pull-right">
													<div className="col-lg-6 col-md-6 col-xs-6">
														<div className="sort-by">
															<ul className="reviews-sortby">
																<li>
																	<small>Sort by:</small>
																	<span><strong className="active-sort">Newest Reviews </strong></span>
																	<div className="reviews-sort-dropdown">
																		<form>
																			<div className="input-reviews">
																				<div className="radio-field">
																					<input name="review" id="check-1" type="radio" value="newest" checked="checked"/>
																					<label for="check-1">Newest Reviews</label>
																				</div>
																				<div className="radio-field">
																					<input name="review" id="check-2" type="radio" value="highest"/>
																					<label for="check-2">Highest Rating</label>
																				</div>
																				<div className="radio-field">
																					<input name="review" id="check-3" type="radio" value="lowest"/>
																					<label for="check-3">Lowest Rating</label>
																				</div>
																			</div>
																		</form>
																	</div>
																</li>
															</ul>
														</div>
													</div>
													<div className="col-lg-6 col-md-6 col-xs-6 pull-right">
														<div className="input-field">
															<i className="icon-angle-down"></i>
															<input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range"/>
														
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="user-reviews-list">
												<div className="review-listing">
													<ul>
														<li className="alert ">
															<div className="list-holder">
																<div className="review-text">
																	<div className="review-title">
																		<h6><a href="#"> Restaurant Demo: Awesome and Lovely Experience </a></h6>
																		<div className="rating-holder">
																			<div className="rating-star">
																				<span className="rating-box" style={{width: "100%"}}></span>
																			</div>
																		</div>
																	</div>
																	<em className="review-date">21 mins Ago </em>
																	<p className="more">It has all the bells and whistles I you are looking for in a Foodbakery directory theme. </p>
																</div>
																<a href="#" className="delete-this-user-review close"><i className="icon-close2"></i></a>
															</div>
														</li>
														<li className="alert ">
															<div className="list-holder">
																<div className="review-text">
																	<div className="review-title">
																		<h6><a href="# "> Restaurant Demo: Delicious and Wealthy </a></h6>
																		<div className="rating-holder">
																			<div className="rating-star">
																				<span className="rating-box" style={{width: "100%"}}></span>
																			</div>
																		</div>
																	</div>
																	<em className="review-date">21 mins Ago </em>
																	<p className="more">A+++ support from developers. Super system, all integrated very well documented and great support, this is great. </p>
																</div>
																<a href="#" className="delete-this-user-review close"><i className="icon-close2"></i></a>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</div>
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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

export default CustomerReviews