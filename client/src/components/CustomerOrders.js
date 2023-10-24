import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function CustomerOrders({ restaurants }) {
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
												<h5>My Orders</h5>
												<div className="right-filters row pull-right">
													<div className="col-lg-6 col-md-6 col-xs-6">
														<div className="input-field">
															<select className="chosen-select-no-single" style={{display: "none"}}>
																<option selected="selected" value="">Select Orders Status</option>
																<option value="Processing">Processing</option>
																<option value="Cancelled">Cancelled</option>
																<option value="Completed">Completed</option>
															</select><div className="chosen-container chosen-container-single chosen-container-single-nosearch" style={{width: "190px"}} title=""><a className="chosen-single" tabindex="-1"><span>Select Orders Status</span><div><b></b></div></a><div className="chosen-drop"><div className="chosen-search"><input type="text" autocomplete="off" readonly=""/></div><ul className="chosen-results"></ul></div></div>
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
												<div className="row">
												
{/* orders List  */}


{userOrders.map((order) => (
  
  <div key={order.id} className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
  <div className="order-list" style={{height: "272px"}}>
      <div className="author-info">
          <div className="img-holder">
              <figure>
                  <a href="#"><img src={`../assets/extra-images/${order.restaurant.image}`}  alt="#"/> </a>
              </figure>
          </div>
          <div className="text-holder">
              <h6><a href="listing-detail.html">{order.restaurant.name}</a></h6>
              <address>Apple Juice</address>
              <span className="price">Ksh {order.price}</span>
          </div>
      </div>
      <div className="post-time">
          <span>Deliver in 10 Minutes </span>
      </div>
      <span className="date-time">
      {order.created_at} </span>
      <div className="order-btn">
          <a href="#" data-toggle="modal" data-target={`#order_detail${order.id}`}>Order Detail</a>
          <span className="order-status" style={{backgroundColor : "#1e73be"}}  >Processing</span>
      </div>



      <div className="modal fade menu-order-detail order-detail" id={`order_detail${order.id}`} tabindex="-1" role="dialog">
																<div className="modal-dialog">
																	<div className="modal-content">
																		<div className="modal-header">
																			<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
																			<h2>Order Detail: {order.id}</h2>
																		</div>
																		<div className="modal-body">
																			<div className="order-detail-inner">
																				<div className="description-holder">
																					<div className="row">
																						<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
																							<div className="list-detail-options has-checkbox">
																								<h3>{order.restaurant.name}</h3>
																								<ul className="order-detail-options">
																									<li className="order-number">
																										<strong>Order ID:</strong>
																										<span>{order.id}</span>
																									</li>
																									<li className="req-delivery">
																										<strong>Delivery Time:</strong>
																										<span>10 Minutes </span>
																									</li>
																									<li className="created-date">
																										<strong>Order Date</strong>
																										<span>{order.created_at} </span>
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
																										<span>{userr.username}</span>
																									</li>
																									<li>
																										<strong>Phone Number :</strong>
																										<span>{userr.phone}</span>
																									</li>
																									<li>
																										<strong>Email :</strong>
																										<span>{userr.email}</span>
																									</li>
																									<li>
																										<strong>Address :</strong>
																										<span>{userr.address}</span>
																									</li>
																								</ul>
																							</div>
																						</div>
																						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																							<div className="order-status-holder">
																								<div className="order-status-process order-status">
																									<p style={{background: "#1e73be"}}>Your order is Processing </p>
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
																					


                                                                                                {order.orderitems.map((orderitem) => (
                                                                                                    
                                                                                                        <li className="order-heading-titles">
                                                                                                            <div>
                                                                                                                <h4>{orderitem.food.name}</h4>
                                                                                                                <h5>{orderitem.food.description}</h5>
                                                                                                            </div>
                                                                                                            <div><span className="category-price">Ksh {orderitem.price}</span></div>
                                                                                                        </li>
                                                                                                        

                                                                                                ))}



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
																										{/* <li className="created-date">
																											<strong>Subtotal:</strong>
																											<span>£24.50</span>
																										</li>
																										<li className="order-type">
																											<strong>
																												Pick Up Fee: </strong>
																											<span>£10.00</span>
																										</li> */}
																										{/* <li className="order-type">
																											<strong>VAT and Fees</strong>
																											<span>£4.48</span>
																										</li> */}
																										<li className="order-type total-price">
																											<strong>Total:</strong>
																											<span>Ksh {order.price}</span>
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

  </div>
</div>
))}


											
													








												</div>
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
    </>
  )
}

export default CustomerOrders