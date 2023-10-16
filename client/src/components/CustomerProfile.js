import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function CustomerProfile({ restaurants }) {
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
									<div className="user-profile">
										<div className="element-title has-border">
											<h5>Account Settings</h5>
										</div>
										<div className="row">
											<form id="publisher_profile">
												<div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
													<div className="row">
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<div className="field-holder">
																<label>Full Name*</label>
																<input type="text" className="foodbakery-dev-req-field" value=""/>
															</div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<div className="field-holder">
																<label>Email Address *</label>
																<input type="text" className="foodbakery-dev-req-field" value=""/>
															</div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<div className="field-holder">
																<label>Phone Number *</label>
																<input type="text" className="foodbakery-dev-req-field" value=""/>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
													<div className="user-profile-images">
														<div className="current-img">
															<div className="row mt">
																<div id="cropContainerModal" data-def-img="../assets/extra-images/team-medium-img1.jpg" data-img-type="default">
																	<figure>
																		<a><img src="../assets/extra-images/team-medium-img1.jpg" alt=""/></a>
																	</figure>
																</div>
															</div><br/>
														<h6> {userr.username} </h6>
														<p> {userr.phone}</p>
														<p> {userr.email} </p>
														<p> {userr.address} </p>
														</div>
														<div className="upload-file">
															<input id="file-1" type="file" className="hide"/>
															<button type="button"><span>Upload Picture</span></button>
														</div>
													
													</div>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="opt-conts">
														<div className="row">
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																<div className="field-holder">
																	<label>Country *</label>
																	<div className="select-holder">
																		<select data-placeholder="Select Country" className="form-control chosen-select form-select-country dir-map-search foodbakery-dev-req-field" id="loc_country_publisher" name="foodbakery_post_loc_country_publisher">
																			<option value="">Select Country</option>
																			<option value="barry" data-name="">Barry</option>
																			<option value="cardiff" data-name="">Cardiff</option>
																			<option value="cowbridge" data-name="">Cowbridge</option>
																			<option value="england" data-name="">England</option>
																			<option value="llantwit-major" data-name="">Llantwit Major</option>
																			<option value="northern-ireland" data-name="">Northern Ireland</option>
																			<option value="penarth" data-name="">Penarth</option>
																			<option value="scotland" data-name="">Scotland</option>
																			<option value="wales" data-name="">Wales</option>
																		</select>
																	</div>
																</div>
															</div>
															<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																<div className="field-holder">
																	<label>State</label>
																	<div className="select-holder">
																		<select data-placeholder="Select State" className="chosen-select">
																			<option value="">Select State</option>
																		</select>
																	</div>
																</div>
															</div>
															<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																<div className="field-holder">
																	<label>City</label>
																	<div className="select-holder">
																		<select data-placeholder="Select City" className="chosen-select">
																			<option value="">Select City</option>
																		</select>
																	</div>
																</div>
															</div>
															<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																<div className="field-holder">
																	<label>Latitude</label>
																	<input type="text" placeholder="Latitude" className="form-control gllpLatitude" value=""/>
																</div>
															</div>
															<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																<div className="field-holder">
																	<label>Longitude</label>
																	<input type="text" placeholder="Longitude" className="form-control gllpLongitude" value=""/>
																</div>
															</div>
															<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																<div className="field-holder">
																	<label>Find On Map</label>
																	<input type="text" placeholder="Type Your Address" className="foodbakery-search-location"/>
																</div>
															</div>
															<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																<div className="field-holder"></div>
																<div className="field-holder search-location-map input-button-loader">
																	<input type="button" className="acc-submit cs-section-update cs-color gllpSearchButton" value="Search Location"/>
																</div>
															</div>
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																<div className="cs-map-section">
																	<img style={{width:"100%",height: "100%"}} src="assets/extra-images/map-location.png" alt=""/>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="element-title has-border">
														<h5>Change Password</h5>
													</div>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="field-holder">
														<label> Current Password*</label>
														<input type="password"/>
													</div>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="field-holder">
														<label> New Password*</label>
														<input type="password"/>
													</div>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="field-holder">
														<label> Confirm New Password* </label>
														<input type="password"/>
													</div>
												</div>
												<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
													<div className="field-holder">
														<button name="button" type="button" className="btn-submit">Save</button>
													</div>
												</div>
											</form>
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

export default CustomerProfile