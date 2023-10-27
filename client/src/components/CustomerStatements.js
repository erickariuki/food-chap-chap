import React, { useEffect, useState } from 'react';
import { NavLink, Route } from 'react-router-dom';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function CustomerStatements({ restaurants }) {
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
									<div className="element-title has-border right-filters-row">
										<h5>Mpesa Statements</h5>
										<div className="right-filters row">
											<div className="col-lg-6 col-md-6 col-xs-6 pull-right">
												<div className="input-field">
													<i className="icon-angle-down"></i>
													<input type="text" data-id="daterange223" id="daterange" value="" placeholder="Select Date Range"/>
													
												</div>
											</div>
										</div>
									</div>
									<div className="responsive-table">
										<ul className="table-generic">
											<li className="order-heading-titles">
												<div>Mpesa Transaction ID</div>
												<div>Order ID</div>
												<div>Date</div>
												<div>Detail</div>
												<div>Amount</div>
											</li>
											<li className="order-heading-titles">
												<div>#QHEHDERFST</div>
												<div><a href="buyer-orders.html" className="orders-tab-link">22594</a></div>
												<div>Apr 9,2023</div>
												<div>Order - Restaurant Demo</div>
												<div>Ksh 2000</div>
											</li>
											<li className="order-heading-titles">
												<div>#QHEHDERFST</div>
												<div><a href="buyer-orders.html" className="orders-tab-link">22589</a></div>
												<div>Apr 9,2023</div>
												<div>Order - Restaurant Demo</div>
												<div>Ksh 4000</div>
											</li>
											<li className="order-heading-titles">
												<div>#QHEHDERFST</div>
												<div><a href="buyer-orders.html" className="orders-tab-link">22469</a></div>
												<div>Mar 31,2023</div>
												<div>Order - Restaurant Demo</div>
												<div>Ksh 5000</div>
											</li>
											<li className="order-heading-titles">
												<div>#QHEHDERFST</div>
												<div><a href="buyer-orders.html" className="orders-tab-link">22413</a></div>
												<div>Mar 27,2023</div>
												<div>Order - Restaurant Demo</div>
												<div>Ksh 4000</div>
											</li>
											<li className="order-heading-titles">
												<div>#QHEHDERFST</div>
												<div><a href="buyer-orders.html" className="orders-tab-link">22360</a></div>
												<div>Mar 26,2023</div>
												<div>Order - Restaurant Demo</div>
												<div>Ksh 6000</div>
											</li>
										</ul>
									</div>
									<ul className="pagination">
										<li className="active"><a>1</a></li>
										<li><a href="#">2</a></li>
										<li><a href="#">3</a></li>
										<li><span className="page-numbers dots">…</span></li>
										<li><a href="#">15</a></li>
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

export default CustomerStatements