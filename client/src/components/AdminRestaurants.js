import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

function AdminRestaurants({user}) {
	// const [userr, setUserr] = useState(null);
	const [restaurants, setRestaurants] = useState([]);
  
	// useEffect(() => {
	//   fetch("/me")
	// 	.then((response) => response.json())
	// 	.then((user) => setUserr(user));
	// }, []);
  
	useEffect(() => {
		fetch(`http://localhost:8080/restaurants`)
		  .then((response) => response.json())
		  .then((restaurants) => setRestaurants(restaurants));
	}, []);

if (user) {
	if (user.user_type !== "admin") {
		window.location.href = "../";
	  }
}

	return (
	  <>
	   {user && (
    		<div className="main-section">
<AdminHeader user={user}/>
			<div className="page-section account-header buyer-logged-in">
				<div className="container">
					<div className="row">
					<AdminSidebar />
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
							<div className="user-dashboard loader-holder">
								<div className="user-holder">
									<div className="user-message" style={{ height: '110px', display: 'none' }}>
										<a className="close" href="#"><i className="icon-cross-out"></i></a>
										<h2>Welcome to your Restaurant.</h2>
										<p>
                                          
                                            Restaurant Dashboard gives you quick access to settings and tools for managing your Account like [Change address] and [Change password] . You can [manage Restaurant] Build Menu , Manage Orders, Bookings, Reviews, Memberships, Withdrawals, Earnings, Statements, Change Password, Location and if you are you Restaurant Owner can also [Manage Team]. 
                                            
                                            </p>
									</div>
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<div className="element-title has-border right-filters-row">
												<h5>Restaurants</h5>
												<div className="right-filters row pull-right">
													<div className="col-lg-6 col-md-6 col-xs-6">
														<div className="input-field">
															<select className="chosen-select-no-single">
																<option selected="selected" value="">Select Orders Status</option>
																<option value="Processing">Processing</option>
																<option value="Cancelled">Cancelled</option>
																<option value="Completed">Completed</option>
															</select>
														</div>
													</div>
													<div className="col-lg-6 col-md-6 col-xs-6">
														<div className="input-field">
															<i className="icon-angle-down"></i>
															<input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range"/>
										
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
											<div className="user-orders-list">
												<div className="responsive-table">
													<ul className="table-generic">
														<li className="order-heading-titles">
															<div>Restaurant</div>
															<div>Address</div>
															<div>Phone</div>
															<div>Email</div>

															{/* <div>Charges</div>
															<div>Received</div> */}
															<div>Status</div>
															<div>Detail</div>
														</li>
													
													
														{restaurants && restaurants.map((restaurant, index) => (
<>
														<li key={index} className="order-heading-titles">
															<div><a href="#" data-toggle="modal" data-target={`#order-det-${restaurant.id}`}>{restaurant.name}</a></div>
															<div>{restaurant.address}</div>
															<div> {restaurant.phone}</div>
															<div> {restaurant.email}</div>

															{/* <div>£ 3.90</div>
															<div>£ 35.09</div> */}
															<div><span className="order-status" style={{ backgroundColor: '#047a06' }} >Approved</span></div>
															<div><a href="#" data-toggle="modal" data-target={`#order-det-${restaurant.id}`}><i className="icon-plus2 text-color"></i></a></div>
														</li>
	<div className="modal fade menu-order-detail order-detail"  id={`order-det-${restaurant.id}`} tabindex="-1" role="dialog" style={{ display: 'none' }}>
	<div className="modal-dialog">
		<div className="modal-content">
			<div className="modal-header">
				<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
				<h2>Order Detail</h2>
			</div>
			<div className="modal-body">
				<div className="order-detail-inner">
					<div className="description-holder">
						<div className="row">
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="list-detail-options has-checkbox">
									<h3>
										{restaurant.name} </h3>
									<ul className="order-detail-options">
										<li className="order-number">
											<strong>Restaurant ID:</strong>
											<span>{restaurant.id}</span>
										</li>
										<li className="req-delivery">
											<strong>Average Delivery Time:</strong>
											<span>10 Minutes </span>
										</li>
									
								
										<li className="order-type">
											<strong>Status:</strong>
											<span>Approved</span>
										</li>

									</ul>
								</div>

							</div>
							<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
								<div className="customer-detail-holder">
									<h3>Owner Details</h3>
									<ul className="customer-detail">
										<li>
											<strong>Name :</strong>
											<span>{restaurant.user.username}</span>
										</li>
										<li>
											<strong>Phone Number :</strong>
											<span>{restaurant.user.phone}</span>
										</li>
										<li>
											<strong>Email :</strong>
											<span>{restaurant.user.email}</span>
										</li>
										<li>
											<strong>Address :</strong>
											<span>{restaurant.user.address}</span>
										</li>
									</ul>
								</div>
							</div>
						
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<h2 className="heading">Food Menu</h2>
								<div className="responsive-table">
									<ul className="categories-order table-generic">
										<li className="order-heading-titles">
											<div>Products</div>
											<div>Price per</div>
										</li>
									
										{
										restaurant.foods && restaurant.foods.map((food, index) => (
										<li className="order-heading-titles">
											<div>
												<h4>{food.name}</h4>
												<h5>{food.description}</h5>
											</div>
											<div><span className="category-price">Ksh {food.price}</span></div>
										</li>
										))}
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
</>

														))}			
													
												
													</ul>

												</div>
												<div className="print-order-detail menu-order-detail order-detail" style={{ display: 'none' }}>
													<div className="logo"><img src="assets/extra-images/main-logo.png" alt=""/></div>
													<h2>Order Detail</h2>
													<div className="order-detail-inner">
														<div className="description-holder">
															<div className="row">
																<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																	<div className="list-detail-options has-checkbox">
																		<h3>Restaurant Demo </h3>
																		<ul className="order-detail-options">
																			<li className="order-number">
																				<strong>Order ID:</strong>
																				<span>22606</span>
																			</li>
																			<li className="req-delivery">
																				<strong>Delivery Time:</strong>
																				<span>10 Minutes </span>
																			</li>
																			<li className="created-date">
																				<strong>Delivery Date:</strong>
																				<span>Apr 9, 2019 06:38 AM </span>
																			</li>
																			<li className="order-type">
																				<strong>Type:</strong>
																				<span>order</span>
																			</li>
																			<li className="order-type">
																				<strong>Payment Status:</strong>
																				<span>Approved</span>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																	<div className="customer-detail-holder">
																		<h3>Customer Detail</h3>
																		<ul className="customer-detail">
																			<li>
																				<strong>Name :</strong>
																				<span>Buyer Demo</span>
																			</li>
																			<li>
																				<strong>Phone Number :</strong>
																				<span>0123456789</span>
																			</li>
																			<li>
																				<strong>Email :</strong>
																				<span>dum4@foodchapchap.com</span>
																			</li>
																			<li>
																				<strong>Address :</strong>
																				<span>London</span>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="row">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="order-status-holder">
																			<h3> Order Status:</h3>
																			<div className="order-status-process order-status">
																				<p>Completed</p>
																			</div>
																		</div>
																	</div>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<h2 className="heading">Food Menu</h2>
																	<div className="responsive-table">
																		<ul className="categories-order table-generic">
																			<li className="order-heading-titles">
																				<div>Products</div>
																				<div>Price per</div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Pizzas</h4>
																					<h5>Foodbakery Special 9" Deep Pan</h5>
																				</div>
																				<div><span className="category-price">£4.80</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Pizzas</h4>
																					<h5>Foodbakery Special 9" Deep Pan</h5>
																				</div>
																				<div><span className="category-price">£4.80</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Pizzas</h4>
																					<h5>Foodbakery Special 12" Deep Pan</h5>
																				</div>
																				<div><span className="category-price">£3.90</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Garlic Bread</h4>
																					<h5>Garlic Bread 12" Deep</h5>
																				</div>
																				<div><span className="category-price">£3.50</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Kebabs</h4>
																					<h5>Kebabs With Naan</h5>
																				</div>
																				<div><span className="category-price">£4.50</span></div>
																			</li>
																			<li className="order-heading-titles">
																				<div>
																					<h4>Burgers</h4>
																					<h5>Quarter Pounder</h5>
																				</div>
																				<div><span className="category-price">£3.00</span></div>
																			</li>
																		</ul>
																	</div>
																</div>
																<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																	<div className="row">
																		<div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
																			<h3>Order Total</h3>
																		</div>
																		<div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
																			<ul className="order-detail-options order-total">
																				<li className="created-date">
																					<strong>Subtotal:</strong>
																					<span>£24.50</span>
																				</li>
																				<li className="order-type">
																					<strong>
																						Pick Up Fee: </strong>
																					<span>£10.00</span>
																				</li>
																				<li className="order-type">
																					<strong>VAT (13%)</strong>
																					<span>£4.48</span>
																				</li>
																				<li className="order-type total-price">
																					<strong>Total:</strong>
																					<span>£38.99</span>
																				</li>
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
									</div>
									<ul className="pagination">
										<li className="active"><a>1</a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
										<li><span className="page-numbers dots">…</span></li>
										<li><a href="#">5</a></li>
										<li><a href="#">Next </a></li>
									</ul>
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

export default AdminRestaurants