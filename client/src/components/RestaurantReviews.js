import React, { useEffect, useState } from 'react'
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function RestaurantReviews({user}) {
	// const [user, setuser] = useState(null);
	const [restaurant, setRestaurant] = useState([]);
  
	// useEffect(() => {
	//   // Fetch user information
	//   fetch("/me")
	// 	.then((response) => response.json())
	// 	.then((user) => setuser(user));
	// }, []);
  
	useEffect(() => {
	  // Fetch user's orders when user changes
	  if (user) {
		fetch(`/restaurants/${user.id}`)
		  .then((response) => response.json())
		  .then((rest) => setRestaurant(rest));
	  }
	}, [user]);

if (user) {
	
	if (user.user_type !== "restaurant_owner") {
		window.location.href = "../";
	  }
}

	// useEffect(() => {
	// 	fetch(`/restaurants/${user.id}`)
	// 	  .then((r) => r.json())
	// 	  .then((restaurant) => setRestaurant(restaurant))
	// 	  .catch((error) => {
	// 		console.error("Error fetching user:", error);
	// 	  });
	//   }, [user]);

	
	const orders = restaurant.orders
	


	return (
	  <>
	   {user && (
    		<div className="main-section">
		<RestaurantHeader user={user}/>
			<div className="page-section account-header buyer-logged-in">
				<div className="container">
					<div className="row">
					<RestaurantSidebar />
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                        <div class="user-dashboard loader-holder">
								<div class="user-holder">
									<div class="dashbard-user-reviews-list">
										<div class="row">
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="element-title has-border reviews-header right-filters-row">
													<h5>
														<span>Reviews Given</span>
														<span class="element-slogan">(4)</span>
													</h5>
													<div class="right-filters row pull-right">
														<div class="col-lg-6 col-md-6 col-xs-6">
															<div class="sort-by">
																<ul class="reviews-sortby">
																	<li class="reviews-sortby-active">
																		<small>Sort by:</small>
																		<span><strong class="active-sort">Newest Reviews </strong></span>
																		<div class="reviews-sort-dropdown">
																			<form>
																				<div class="input-reviews">
																					<div class="radio-field">
																						<input name="review" id="check-1" type="radio" value="newest" checked="checked"/>
																						<label for="check-1">Newest Reviews</label>
																					</div>
																					<div class="radio-field">
																						<input name="review" id="check-2" type="radio" value="highest"/>
																						<label for="check-2">Highest Rating</label>
																					</div>
																					<div class="radio-field">
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
														<div class="col-lg-6 col-md-6 col-xs-6 pull-right">
															<div class="input-field">
																<i class="icon-angle-down"></i>
																<input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range"/>
												
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="user-reviews-list">
													<div class="review-listing">
														<ul>
															<li class="alert ">
																<div class="list-holder">
																	<div class="review-text">
																		<div class="review-title">
																			<h6><a href="#">Buyer Demo: Awesome and Lovely Experience</a></h6>
																			<div class="rating-holder">
																				<div class="rating-star">
																					<span class="rating-box"  style={{width:"100%"}} ></span>
																				</div>
																			</div>
																		</div>
																		<em class="review-date">1 day Ago</em>
																		<p class="more">
																			It has all the bells and whistles I you are looking for in a Foodbakery directory theme. </p>
																		<a href="#" class="review-reply-btn dashboard-review-reply-btn">
																			<i class="icon-reply"></i>Post a reply
																		</a>
																	</div>
																</div>
															</li>
															<li class="alert ">
																<div class="list-holder">
																	<div class="review-text">
																		<div class="review-title">
																			<h6><a href="#">Buyer Demo: Delicious and Wealthy</a></h6>
																			<div class="rating-holder">
																				<div class="rating-star">
																					<span class="rating-box" style={{width:"100%"}}></span>
																				</div>
																			</div>
																		</div>
																		<em class="review-date">1 day Ago</em>
																		<p class="more">A+++ support from developers. Super system, all integrated very well documented and great support, this is great. </p>
																		<a href="#" class="review-reply-btn dashboard-review-reply-btn"><i class="icon-reply"></i>Post a reply</a>
																	</div>
																</div>
															</li>
															<li class="alert ">
																<div class="list-holder">
																	<div class="review-text">
																		<div class="review-title">
																			<h6><a href="#">: Best Food</a></h6>
																			<div class="rating-holder">
																				<div class="rating-star">
																					<span class="rating-box" style={{width:"100%"}}></span>
																				</div>
																			</div>
																		</div>
																		<em class="review-date">12 months Ago</em>
																		<p class="more">A wonderfull experience. </p>
																		<a href="#" class="review-reply-btn dashboard-review-reply-btn"><i class="icon-reply"></i>Post a reply</a>
																	</div>
																</div>
															</li>
															<li class="alert ">
																<div class="list-holder">
																	<div class="review-text">
																		<div class="review-title">
																			<h6><a href="#">: Best food</a></h6>
																			<div class="rating-holder">
																				<div class="rating-star">
																					<span class="rating-box" style={{width:"100%"}}></span>
																				</div>
																			</div>
																		</div>
																		<em class="review-date">12 months Ago</em>
																		<p class="more">
																			I had great food the other day </p>
																		<a href="#" class="review-reply-btn dashboard-review-reply-btn"><i class="icon-reply"></i>Post a reply</a>
																	</div>
																</div>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div class="dashboard-add-new-review-holder add-new-review-holder" style={{display:"none"}} >
										<div class="row">
											<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
												<div class="elements-title">
													<h3>Rate and Write a Review</h3>
													<a href="#" class="dashboard-close-post-new-reviews-btn close-post-new-reviews-btn">Close</a>
												</div>
											</div>
											<div class="foodbakery-add-review-data">
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element">
														<i class="icon-edit2"></i>
														<input type="text" placeholder="Title of your Comment *" value=""/>
													</div>
												</div>
												<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<div class="form-element">
														<i class="icon-user4"></i>
														<input type="text" placeholder="Name *" value="resturant-demo" disabled="disabled"/>
													</div>
												</div>
												<div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
													<div class="form-element">
														<i class="icon-envelope3"></i>
														<input type="text" placeholder="Email *" value="dum32@chimpgroup.com"/>
													</div>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element">
														<i class="icon-message"></i>
														<textarea placeholder="Tell about your experience or leave a tip for others" cols="30" rows="10" maxlength="0"></textarea>
													</div>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element message-length">
														<span class="min_char">Min characters: 0</span>
														<span class="max_char">Max characters: 0</span>
														<div id="textarea_feedback"></div>
													</div>
												</div>
												<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div class="form-element">
														<div class="review-reply-button input-button-loader">
															<input type="button" value="Submit your Review"/>
														</div>
													</div>
												</div>
											</div>
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

export default RestaurantReviews