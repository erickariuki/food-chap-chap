import React, { useEffect, useState } from 'react'
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function RestaurantFoods({user}) {
	// const [userr, setUserr] = useState(null);
	const [restaurant, setRestaurant] = useState([]);
	const [foods, setFoods] = useState([]);
	const [isSuccess, setIsSuccess] = useState(false);
	const [message, setMessage] = useState('');
  
	// useEffect(() => {
	//   fetch('/me')
	// 	.then((response) => response.json())
	// 	.then((user) => setUserr(user));
	// }, []);
  
	useEffect(() => {
	  if (user) {
		fetch(`/restaurants/${user.id}`)
		  .then((response) => response.json())
		  .then((rest) => {
			setRestaurant(rest);
			setFoods(rest.foods);
		  });
	  }
	}, [user]);
  
	if (user && user.user_type !== 'restaurant_owner') {
	  window.location.href = '../';
	}
  
	function handleDeleteFood(id) {
	  fetch(`/foods/${id}`, {
		method: 'DELETE',
	  })
		.then((response) => {
		  if (response.ok) {
			const updatedFoods = foods.filter((food) => food.id !== id);
			setFoods(updatedFoods);
  
			setIsSuccess(true);
			setMessage('Food deleted successfully!');
		  } else {
			setIsSuccess(false);
			setMessage('Failed to delete food. Please try again.');
		  }
		})
		.catch((error) => {
		  setIsSuccess(false);
		  setMessage('An error occurred. Please try again.');
		});
	}

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
												<h5>Foods</h5><br/>
												{message && (
                              <p
                                style={{
                                  backgroundColor: isSuccess
                                    ? 'green'
                                    : 'red',
                                  color: 'white',
                                  padding: '10px',
                                  marginBottom: '10px',
                                  borderRadius: '5px',
                                }}
                              >
                                {message}
                              </p>
                            )}
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
															<div>Food</div>
															<div>Description</div>
															<div>Total Price</div>
															{/* <div>Charges</div>
															<div>Received</div> */}
															{/* <div>Status</div> */}
															<div>Detail</div>
														</li>
													
													
														{foods && foods.map((food, index) => (

<>
														<li key={index} className="order-heading-titles">
															<div><a href="#" data-toggle="modal" data-target={`#order-det-${food.id}`}style={{textTransform:"capitalize"}}>{food.name}</a></div>
															<div>{food.description}</div>
                                                        	<div>ksh {food.price}</div>
															{/* <div>£ 3.90</div>
															<div>£ 35.09</div> */}
															{/* <div><span className="order-status" style={{ backgroundColor: '#047a06' }} >Completed</span></div> */}
															<div><button className='btn btn-sm btn-danger'     onClick={() => handleDeleteFood(food.id)} data-toggle="modal" data-target={`#order-det-${food.id}`}>DELETE</button></div>
														</li>

</>

														))}			
													
												
													</ul>

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

export default RestaurantFoods