import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function CustomerBookings({ restaurants }) {
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
									<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<div className="element-title has-border right-filters-row">
												<h5>My Bookings</h5>
												<div className="right-filters row pull-right">
													<div className="col-lg-6 col-md-6 col-xs-6">
														<div className="input-field">
															<select className="chosen-select-no-single">
																<option selected="selected" value="">Select Booking Status</option>
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
											<div className="user-orders-list responsive-table">
												<ul className="table-generic" id="portfolio">
													<li>
														<div className="orders-title">Restaurant Name</div>
														<div className="orders-date">Date</div>
														<div className="orders-type">Status</div>
														<div className="orders-price">Detail</div>
													</li>
													<li>
														<div className="orders-title">
															<h6 className="order-title">
																<a href="#" data-toggle="modal" data-target="#booking-detail-22603">Restaurant Demo </a>
																<span>( #22603 )</span>
															</h6>
														</div>
														<div className="orders-date">
															<span>Apr 9,2023</span>
														</div>
														<div className="orders-status">
															<span className="booking-status" style={{backgroundColor: "#1e73be"}}>Processing</span>
														</div>
														<div className="orders-price">
															<a href="#" data-toggle="modal" data-target="#booking-detail-22603"><i className="icon-plus2 text-color"></i></a>
														</div>
													</li>
													<li>
														<div className="orders-title">
															<h6 className="order-title">
																<a href="#" data-toggle="modal" data-target="#booking-detail-22603">Restaurant Demo </a>
																<span>( #22600 )</span>
															</h6>
														</div>
														<div className="orders-date">
															<span>Apr 9,2023</span>
														</div>
														<div className="orders-status">
															<span className="booking-status" style={{backgroundColor: "#1e73be"}}>Processing</span>
														</div>
														<div className="orders-price">
															<a href="#" data-toggle="modal" data-target="#booking-detail-22603"><i className="icon-plus2 text-color"></i></a>
														</div>
													</li>
													<li>
														<div className="orders-title">
															<h6 className="order-title">
																<a href="javascript:void(0);" data-toggle="modal" data-target="#booking-detail-22603">Restaurant Demo </a>
																<span>( #22445 )</span>
															</h6>
														</div>
														<div className="orders-date">
															<span>Mar 30,2023</span>
														</div>
														<div className="orders-status">
															<span className="booking-status" style={{backgroundColor: "#047a06"}}>Completed</span>
														</div>
														<div className="orders-price">
															<a href="javascript:void(0);" data-toggle="modal" data-target="#booking-detail-22603"><i className="icon-plus2 text-color"></i></a>
														</div>
													</li>
													<li>
														<div className="orders-title">
															<h6 className="order-title">
																<a href="#" data-toggle="modal" data-target="#booking-detail-22603">Restaurant Demo </a>
																<span>( #22438 )</span>
															</h6>
														</div>
														<div className="orders-date">
															<span>Mar 30,2023</span>
														</div>
														<div className="orders-status">
															<span className="booking-status" style={{backgroundColor: "#1e73be"}} >Processing</span>
														</div>
														<div className="orders-price">
															<a href="#" data-toggle="modal" data-target="#booking-detail-22603"><i className="icon-plus2 text-color"></i></a>
														</div>
													</li>
													<li>
														<div className="orders-title">
															<h6 className="order-title">
																<a href="#" data-toggle="modal" data-target="#booking-detail-22603">Dragon Express </a>
																<span>( #22405 )</span>
															</h6>
														</div>
														<div className="orders-date">
															<span>Mar 27,2023</span>
														</div>
														<div className="orders-status">
															<span className="booking-status" style={{backgroundColor: "#1e73be"}}>Processing</span>
														</div>
														<div className="orders-price">
															<a href="#" data-toggle="modal" data-target="#booking-detail-22603"><i className="icon-plus2 text-color"></i></a>
														</div>
													</li>
													<li>
														<div className="orders-title">
															<h6 className="order-title">
																<a href="#" data-toggle="modal" data-target="#booking-detail-22603">Restaurant Demo </a>
																<span>( #22149 )</span>
															</h6>
														</div>
														<div className="orders-date">
															<span>Mar 15,2023</span>
														</div>
														<div className="orders-status">
															<span className="booking-status" style={{backgroundColor: "#047a06"}}>Completed</span>
														</div>
														<div className="orders-price">
															<a href="#" data-toggle="modal" data-target="#booking-detail-22603"><i className="icon-plus2 text-color"></i></a>
														</div>
													</li>
													
												</ul>
											</div>
										</div>
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





	 )}


<div className="modal fade menu-order-detail menu-order-info" id="booking-detail-22603" tabindex="-1" role="dialog">
		<div className="modal-dialog" role="document">
			<div className="modal-content">
				<div className="modal-header">
					<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
					<h2><a>Booking Detail</a></h2>
				</div>
				<div className="modal-body booking-modal-body">
					<div className="order-detail-inner">
						<h3>Restaurant Demo </h3>
						<ul className="order-detail-options">
							<li>
								<strong>Booking ID :</strong>
								<span>22603</span>
							</li>
							<li>
								<strong>Booking Date :</strong>
								<span>Apr 9,2023 6:40 AM </span>
							</li>
						</ul>
						<h3>Customer Deatil</h3>
						<ul className="order-detail-options">
							<li>
								<strong>First Name:</strong>
								<span>Mark</span>
							</li>
							<li>
								<strong>Last Name:</strong>
								<span>Jose</span>
							</li>
							<li>
								<strong>Email:</strong>
								<span>markjose@gmail.com</span>
							</li>
							<li>
								<span>4-guest</span>
							</li>
							<li>
								<span>Apr 30,2023 11:00 AM</span>
							</li>
							<li className="order-detail-message">
								<strong>Instructions:</strong>
								<span>I need to book a special table for my friends. Make it some special.!</span>
							</li>
						</ul>
						<div className="booking-status-holder">
							<div className="booking-status-process booking-status">
								<p style={{backgroundColor: "#1e73be"}}>Your booking is Processing.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}

export default CustomerBookings