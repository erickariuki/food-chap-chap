import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function RestaurantsMenu({restaurants , username, updateCart}) {
	
	const { id } = useParams();

	const restaurant = restaurants.filter((restaurant) => restaurant.id == id);

	if (restaurant.length === 0) {

		window.location.href = "../restaurants";

	}
	const { name, address, phone, latitude, longitude, email, user, foods, image } = restaurant[0];
  
	const [cartItems, setCartItems] = useState([]);
	const [message, setMessage] = useState('');
	const [isSuccess, setIsSuccess] = useState(false);

	const calculateTotalPrice = () => {
		let totalPrice = 0;
		cartItems.forEach((item) => {
		totalPrice += item.price;
		updateCart(totalPrice)
		});
		return totalPrice;
	};

	const calculateVAT = 0.16 * calculateTotalPrice();
 	const p =	calculateTotalPrice();
	
	let fee = 0;
	if (p	 > 1 &&p < 500){
		fee = 30;
	}else if (p	 > 499 && p	< 1000)
	{
		fee = 50;
	}else if (p > 999 && p	< 1500)
	{
		fee = 100;
	}else if (p	 > 1499 && p	< 2000)
	{
		fee = 150;
	}else if (p	 > 1999)
	{
		fee = 200;
	}

const totalall = fee + p + calculateVAT;



   const handleAddToCart = (food) => {
    setCartItems((prevCartItems) => [...prevCartItems, food]);
  };

  

  let userid = 1;;
  if (username != null) {
	  userid = username.id;
	}


	console.log('useridddd', userid);

  const handleSubmitOrder = () => {
    const order = {
      user_id: user.id, 
      quantity: cartItems.length,
	  restaurant_id: id,
      price: totalall,
    };

console.log('orderrrr', order);
	
    fetch('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ order }), 
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);


		
        const orderId = data.id; 
        const orderItems = cartItems.map((item) => ({
          order_id: orderId,
          food_id: item.id,
          quantity: 1, 
          price: item.price,
        }));

        fetch('/orderitems', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ order_items: orderItems }), 
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setIsSuccess(true);
            setMessage(`Order Number:${orderId} successfully created. Pay using M-Pesa to complete the order.`);
          })
          .catch((error) => {
            console.error(error);
            setIsSuccess(false);
            setMessage('An error has occurred while creating the order.');
          });
      })
      .catch((error) => {
        console.error(error);
        setIsSuccess(false);
        setMessage('An error has occurred while creating the order.');
      });

    setCartItems([]);
  };

  const handleRemoveFromCart = (foodId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== foodId));
  };

  return (
    <>
     <div className="main-section">
     <div className="page-section restaurant-detail-image-section" style={{ background: 'url(../assets/extra-images/cover-photo01.jpg) no-repeat scroll 0 0 / cover'}} >
					<div className="container">
						<div className="row">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
								<div className="company-info-detail">
									<div className="company-info">
										<div className="img-holder">
											<figure><img  src={`../assets/extra-images/${image}`} alt="#"/></figure>
										</div>
										<div className="text-holder">
											<div className="rating-star">
												<span className="rating-box" style={{ width: '100%' }}></span>
											</div>
											<span className="reviews">(1 Reviews)</span>
											<span className="restaurant-title">{name}</span>
											<div className="text">
												<i className="icon-local_pizza"></i>
												<p>Apple Juice</p>
											</div>
										</div>
									</div>
									<div className="delivery-timing reviews-sortby">
										<div className="text">
											<i className="icon-motorcycle"></i>
											<p>
												Delivery fee: £10.00<span>
													Min Order : £10.00 Max Order : £50.00</span>
											</p>
										</div>
										<ul>
											<li>
												<a href="#" className="reviews-sortby-active">
													<span>Today :</span>
													11:00 am - 11:00 pm <i className="icon-chevron-small-down"></i>
												</a>
												<ul className="delivery-dropdown">
													<li><a href="#"><span className="opend-day">Monday</span> <span className="opend-time"><small>:</small> 11:00 am - 11:00 pm</span></a></li>
													<li><a href="#"><span className="opend-day">Tuesday</span> <span className="opend-time"><small>:</small> 11:00 am - 11:00 pm</span></a></li>
													<li><a href="#"><span className="opend-day">Wednesday</span> <span className="opend-time"><small>:</small> 11:00 am - 11:00 pm</span></a></li>
													<li><a href="#"><span className="opend-day">Thursday</span> <span className="opend-time"><small>:</small> 11:00 am - 11:00 pm</span></a></li>
													<li><a href="#"><span className="opend-day">Friday</span> <span className="opend-time"><small>:</small> 11:00 am - 11:00 pm</span></a></li>
													<li><a href="#"><span className="opend-day">Saturday</span> <span className="opend-time"><small>:</small> 11:00 am - 11:00 pm</span></a></li>
													<li><a href="#"><span className="opend-day">Sunday</span> <span className="opend-time close-day"><small>:</small>Closed</span></a></li>
												</ul>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>






            <div className="page-section">
					<div className="container">
						<div className="row">
							<div className="col-lg-2 col-md-2 col-sm-3 col-xs-12 sticky-sidebar">
								<div className="filter-toggle">
									<span className="filter-toggle-text">Categories By</span><i className="icon-chevron-down"></i>
								</div>
								<div className="filter-wrapper">
									<div className="categories-menu">
										<h6><i className="icon-restaurant_menu"></i>Categories</h6>
										<ul className="menu-list">
											<li className="active"><a href="#" className="menu-category-link"> Pizzas </a></li>
											<li><a href="#" className="menu-category-link"> Calzone </a></li>
											<li><a href="#" className="menu-category-link"> Garlic Bread </a></li>
											<li><a href="#" className="menu-category-link"> Kebabs </a></li>
											<li><a href="#" className="menu-category-link"> Burgers </a></li>
											<li><a href="#" className="menu-category-link"> Specials </a></li>
											<li><a href="#" className="menu-category-link"> Wraps </a></li>
											<li><a href="#" className="menu-category-link"> Chicken </a></li>
											<li><a href="#" className="menu-category-link"> Paninis </a></li>
											<li><a href="#" className="menu-category-link"> Jacket Potatoes </a></li>
											<li><a href="#" className="menu-category-link"> Starters </a></li>
											<li><a href="#" className="menu-category-link"> Traditional Curries </a></li>
											<li><a href="#" className="menu-category-link"> Biryani Dishes </a></li>
											<li><a href="#" className="menu-category-link"> Vegetarian Dishes </a></li>
											<li><a href="#" className="menu-category-link"> Rice </a></li>
											<li><a href="#" className="menu-category-link"> Bread </a></li>
											<li><a href="#" className="menu-category-link"> Sauces </a></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-7 col-md-7 col-sm-9 col-xs-12">
								<div className="tabs-holder horizontal">
									<ul className="stickynav-tabs nav nav-tabs">
										<li className="active"><a data-toggle="tab" href="#home"><i className="icon- icon-room_service"></i>Menu</a></li>
										<li><a data-toggle="tab" href="#menu1"><i className="icon- icon-textsms"></i>Reviews (1)</a></li>
										<li><a data-toggle="tab" href="#menu2"><i className="icon- icon-food"></i>Book a Table</a></li>
										<li><a data-toggle="tab" href="#menu3"><i className="icon- icon-info3"></i>Restaurant Info</a></li>
									</ul>
									<div className="tab-content">
										<div id="home" className="tab-pane fade in active">
											<div className="menu-itam-holder">
												<div className="field-holder sticky-search">
													<input id="menu-srch-6272" data-id="6272" className="input-field dev-menu-search-field" type="text" placeholder="Search food item"/>
												</div>
												<div id="menu-item-list-6272" className="menu-itam-list">
													
														{/* populate food  */}
													
													{/* <div className="element-title" id="menu-category-0">
														<h5 className="text-color">Pizzas</h5>
														<span>Choose your cut: Triangular, square, fingers or Un cut on any size pizza.</span>
													</div> */}
													<ul>
													
												


													{foods.map((food) => (
                                                       
													   <li key={food.id}>
													   <div className="image-holder"> <a href="listings.html"><img src={`../assets/extra-images/${food.image}`} alt="#"/></a></div>
													   <div className="text-holder">
														   <h6>{food.name}</h6>
														   <span>{food.description}</span>
														
													   </div>
													  
													  	<div className="price-holder">
																<span className="price">Ksh {food.price}</span>
																<a onClick={() => handleAddToCart(food)}  className="dev-adding-menu-btn"><i className="icon-plus4 text-color"></i></a>
																<span id="add-menu-loader-0"></span>
															</div>
													  
											
												   </li>
													 
													 
													 
												
                                                          ))}
													
														




													
													</ul>
													
												</div>
											</div>
										</div>
										<div id="menu1" className="tab-pane fade">
											<div className="reviews-holder">
												<div className="add-new-review-holder" style={{ display: 'none' }}>
													<div className="row">
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<div className="elements-title">
																<h3>Rate and Write a Review</h3>
																<a href="#" className="close-post-new-reviews-btn">Close</a>
															</div>
														</div>
														<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{   textAlign: 'center',}}>Please login
															in order to post review.
														</div>
													</div>
												</div>
												<div className="reviwes-restaurant-holder">
													<div className="over-all-rating-holder">
														<div className="overall-ratings-container">
															<div className="overall-rating">
																<h6>Customer Reviews For Food Bakery</h6>
																<ul className="reviews-box">
																	<li>
																		<em>5.0 </em>
																		<div className="rating-star">
																			<span className="rating-box" style={{ width: '100%' }}></span>
																		</div>
																		<span className="reviews-count">(based on 1
																			reviews)</span>
																	</li>
																	<li>
																		<div className="icon-holder"><i className="icon-smile"></i>
																		</div>
																		<p><span>100%</span> of diners recommend this
																			restaurant
																		</p>
																	</li>
																</ul>
															</div>
														</div>
														<div className="ratings-summary-container">
															<div className="rating-summary">
																<h5>Rating summary</h5>
																<ul>
																	<li>
																		<span className="review-category">Service</span>
																		<div className="rating-star">
																			<span className="rating-box" style={{ width: '100%' }}></span>
																		</div>
																	</li>
																	<li>
																		<span className="review-category">Quality</span>
																		<div className="rating-star">
																			<span className="rating-box" style={{ width: '100%' }}></span>
																		</div>
																	</li>
																	<li>
																		<span className="review-category">Value</span>
																		<div className="rating-star">
																			<span className="rating-box" style={{ width: '100%' }}></span>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
													</div>
													<div className="review-listing">
														<div className="elements-title">
															<h5>Customer Reviews For Restaurant Demo <span>1</span></h5>
															<div className="sort-by">
																<span className="ajax-loader-sorty-by" style={{ display: 'none' }}>
																	<img src="assets/images/ajax-loader.gif" alt=""/></span>
																<ul className="reviews-sortby">
																	<li>
																		<span className="active-sort">Newest Reviews</span>
																		<div className="reviews-sort-dropdown">
																			<form>
																				<div className="input-reviews">
																					<div className="radio-field">
																						<input name="review" id="check-1" type="radio" value="newest" checked="checked"/>
																						<label for="check-1">Newest
																							Reviews</label>
																					</div>
																					<div className="radio-field">
																						<input name="review" id="check-2" type="radio" value="highest"/>
																						<label for="check-2">Highest
																							Rating</label>
																					</div>
																					<div className="radio-field">
																						<input name="review" id="check-3" type="radio" value="lowest"/>
																						<label for="check-3">Lowest
																							Rating</label>
																					</div>
																				</div>
																			</form>
																		</div>
																	</li>
																</ul>
															</div>
														</div>
														<ul className="review-restaurant">
															<li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
																<div className="list-holder ">
																	<div className="review-text">
																		<div className="review-title">
																			<h6>: Best Food </h6>
																			<div className="rating-holder">
																				<div className="rating-star">
																					<span style={{ width: '100%' }} className="rating-box"></span>
																				</div>
																			</div>
																		</div>
																		<em className="review-date">25 Apr 2018</em>
																		<p>A wonderfull experience. </p>
																	</div>
																</div>
															</li>
															<li className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
																<div className="list-holder ">
																	<div className="review-text">
																		<div className="review-title">
																			<h6>: Best food </h6>
																			<div className="rating-holder">
																				<div className="rating-star">
																					<span style={{ width: '100%' }} className="rating-box"></span>
																				</div>
																			</div>
																		</div>
																		<em className="review-date">25 Apr 2018</em>
																		<p>I had great food the other day </p>
																	</div>
																</div>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
										<div id="menu2" className="tab-pane fade">
											<div className="booking-info-sec">
												<form name="booking-form" id="booking-form" className="booking-form" method="post">
													<div className="row">
														<div className="booking-info">
															<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																<div className="row">
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<h5>Book This Restaurant</h5>
																		<p className="booking-desc">All kinds of dining
																			experiences
																			are waiting to be discovered. Check out the best
																			restaurants and Book Using following Form.</p>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
																		<div className="field-holder has-icon"><i className="icon icon-user"></i><input type="text" placeholder="First Name" className="input-field" id="first-name" name="first-name"/></div>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
																		<div className="field-holder has-icon"><i className="icon icon-user"></i><input type="text" placeholder="Last Name" className="input-field" id="lastname-booking" name="lastname-booking"/>
																		</div>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
																		<div className="field-holder has-icon"><i className="icon icon-envelope2"></i><input type="text" placeholder="Email" className="input-field foodbakery-email-field" id="email-booking" name="email-booking"/>
																		</div>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
																		<div className="field-holder has-icon"><i className="icon icon-users3"></i>
																			<select className="chosen-select" style={{ display: 'none' }}>
																				<option selected="selected" value="">Guests
																				</option>
																				<option value="">2 Guests</option>
																				<option value="">4 Guests</option>
																				<option value="">6 Guests</option>
																				<option value="">8 Guests</option>
																			</select>
																		</div>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
																		<div className="field-holder has-icon">
																			<div className="date-sec"><i className="icon-event_available"> </i><input type="text" placeholder="Booking date" className="form-control booking-date" id="date-of-booking" name="date-of-booking"/>
																			
																				<ul className="calendar-options">
																					<li className="avilable">Available</li>
																					<li className="unavailable">Unavailable</li>
																				</ul>
																			</div>
																		</div>
																	</div>
																	<div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
																		<div className="field-holder has-icon">
																			<div className="booking_time_wrapper">
																				<div id="time-div-time-date-of-booking"><i className="icon-clock-o"></i>
																					<select className="chosen-select foodbakery-required-field" id="time-date-of-booking" style={{ display: 'none' }}>
																						<option value="">12:00 AM</option>
																						<option value="">12:15 AM</option>
																						<option value="">12:30 AM</option>
																						<option value="">12:45 AM</option>
																						<option value="">01:00 AM</option>
																						<option value="">01:15 AM</option>
																						<option value="">01:30 AM</option>
																						<option value="">01:45 AM</option>
																						<option value="">02:00 AM</option>
																						<option value="">02:15 AM</option>
																						<option value="">02:30 AM</option>
																						<option value="">02:45 AM</option>
																						<option value="">03:00 AM</option>
																						<option value="">03:15 AM</option>
																						<option value="">03:30 AM</option>
																						<option value="">03:45 AM</option>
																						<option value="">04:00 AM</option>
																						<option value="">04:15 AM</option>
																						<option value="">04:30 AM</option>
																					</select>
																				</div>
																			</div>
																		</div>
																	</div>
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="field-holder has-icon field-textarea"><i className="icon icon-mode_edit"></i>
																			<textarea placeholder="Your Instructions" id="contact-booking" name="contact-booking" className="input-field"></textarea>
																		</div>
																	</div>
																	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
																		<div className="field-holder">
																			<div className="submit-btn">
																				<button type="button" className="field-btn bgcolor booking-submit-btn input-button-loader">Submit</button>
																				<span className="booking-loader"></span>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>
										</div>
										<div id="menu3" className="tab-pane fade">
											<div className="contact-info-detail">
												<h5>Overview Restaurant Demo</h5>
												<p className="restaurant-desc"></p>
												<p>Base prepared fresh daily. Extra toppings are available in choose
													extraChoose
													you sauce: Go for BBQ sauce or piri piri sauce on your pizza base for no
													extra cost.Choose your cut: Triangular, square, fingers or Un cut on any
													size pizza
												</p>
												<div className="map-sec-holder">
													<div className="cs-map-section">
														<div className="cs-map">
															<div className="cs-map-content">
																<div className="mapouter">
																	<div className="gmap_canvas">  < iframe src={`//maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}></iframe>Google Maps Generator
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="row">
													<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
														<div className="contact-info">
															<h5>Contact details</h5>
															<p>Totnes, United Kingdom</p>
															<ul>
																<li className="cell"><i className="icon-phone"></i><a href="#">+44
																		(0) 20 3310 2000</a></li>
																<li className="pizzaeast"><i className="icon-globe2"></i><a href="#">http://www.foodchapchap.com</a></li>
																<li className="email"><i className="icon-mail5"></i><a className="text-color" href="#">Send Enquiry
																		By Email</a></li>
															</ul>
														</div>
													</div>
													<div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
														<div className="widget widget-timing">
															<h5>Opening Hours</h5>
															<ul>
																<li><span>Monday</span>11:00 am - 11:00 pm</li>
																<li><span>Tuesday</span>11:00 am - 11:00 pm</li>
																<li><span>Wednesday</span>11:00 am - 11:00 pm</li>
																<li><span>Thursday</span>11:00 am - 11:00 pm</li>
																<li><span>Friday</span>11:00 am - 11:00 pm</li>
																<li><span>Saturday</span>11:00 am - 11:00 pm</li>
																<li><span>Sunday</span>Off</li>
															</ul>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="sticky-sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12">
								<div className="user-order-holder">
									<div className="user-order">
										<h6><i className="icon-shopping-basket"></i>Your Order</h6>
										<span className="error-message pre-order-msg">This restaurant allows Pre orders.</span>
										{message && (
  <div
    style={{
      backgroundColor: isSuccess ? "green" : "red",
      color: "white",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px",
      marginTop: "36px",
    }}
  >
    {message}
  </div>
)}

										<span className="discount-info" style={{ display: 'block'}}>If you have a discount code,<br/>
											you will
											be able to input it<br/> at the payments stage.</span>
										{/* <div className="select-option dev-select-fee-option">
											<ul>
												<li>
													<input id="order-pick-up-fee" type="radio" name="order_fee_type"/>
													<label for="order-pick-up-fee">Pick-Up</label>
													<span>£15.00</span>
												</li>
												<li>
													<input id="order-delivery-fee" checked="checked" type="radio" name="order_fee_type"/>
													<label for="order-delivery-fee">Delivery</label>
													<span>£10.00</span>
												</li>
											</ul>
										</div> */}
										<div id="dev-menu-orders-list">
										
										
										
										




	










										{/* Orders List */}
										
										<ul className="categories-order">
                                        {cartItems.length > 0 && (
                                      <>
                                      
                                        <div className="Order_number">
                                            <ul>
                                            {cartItems.map((item) => (
                                              
											 
											  <li>
											  <a onClick={() => handleRemoveFromCart(item.id)} href="#" className="btn-cross dev-remove-menu-item" ><i style={{marginRight: "23px",color: "red",marginLeft: "-25px"}} className=" icon-cross3"></i></a>
											  <a style={{ fontSize: "15px", marginLeft: "-21px", fontWeight: "bold", textTransform: "capitalize" }}>{item.name}</a>
											  <span className="category-price">Ksh {item.price}</span>
										  </li>
											 
									
                                               ))}
                                            </ul>
                                        </div>
                                        </>
)}
										















											</ul>
											<div className="price-area dev-menu-price-con">
												<ul>
													<li>Subtotal <span className="price">Ksh <em className="dev-menu-subtotal">{p}</em></span></li>
													<li className="restaurant-fee-con">
														<span className="fee-title">Fee</span>
														<span className="price">Ksh <em className="dev-menu-charges">{fee}</em></span>
													</li>
													<li>VAT (16%) <span className="price">Ksh <em className="dev-menu-vtax">{calculateVAT}</em></span></li>
												</ul>
												<p className="total-price">Total <span className="price">Ksh <em className="dev-menu-grtotal">{totalall}</em></span></p>
											</div>
										</div>
										<div id="dev-no-menu-orders-list">
											<span className="success-message">There are no items in your basket.</span>
										</div>
										<div className="pay-option dev-order-pay-options">
											<ul>
												<li>
													<input id="order-cash-payment" type="radio" name="order_payment_method"/>
													<label for="order-cash-payment"><i className="icon-coins"></i>Cash</label>
												</li>
												<li>
													<input id="order-card-payment" type="radio" checked="checked" name="order_payment_method"/>
													<label for="order-card-payment"><i className="icon-credit-card4"></i>Card</label>
												</li>
											</ul>
										</div>
										<div className="row">
											<div className="col-sm-12">
												<div className="form-group">
													<div className="input-group date">
														<input type="text" name="delivery_date" id="datetimepicker1" className="form-control" value="04-04-2019 10:07" placeholder="Select Date and Time"/>
														<span className="input-group-addon">
															<span className="icon-event_available"></span>
														</span>
													</div>
												</div>
											</div>
										</div>
										<button onClick={handleSubmitOrder}className="menu-order-confirm">Confirm Order</button>
										<span className="menu-loader"></span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
		</div>
    

		<div className="modal fade menu-extras-modal" id="extras-0-1" tabindex="-1" role="dialog">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
						<h2><a>Accompaniments</a></h2>
					</div>
					<div className="modal-body">
						<div className="menu-selection-container">
					
							<div className="extras-detail-main">
								{/* <h3>Sausage</h3> */}
								<div className="extras-detail-options">
									<div className="extras-detail-att">
										<input type="checkbox" id="extra-0-0-11" data-ind="0" data-menucat-id="0" data-menu-id="1" name="extra-0-15"/>
										<label for="extra-0-0-11">
											<span className="extra-title">Spicy Mayonnaise</span>
											<span className="extra-price">£1.50</span>
										</label>
									</div>
									<div className="extras-detail-att">
										<input type="checkbox" id="extra-1-0-12" data-ind="1" data-menucat-id="0" data-menu-id="1" name="extra-0-15"/>
										<label for="extra-1-0-12">
											<span className="extra-title">Tequila Lime Sauce</span>
											<span className="extra-price">£2.50</span>
										</label>
									</div>
									<div className="extras-detail-att">
										<input type="checkbox" id="extra-2-0-13" data-ind="2" data-menucat-id="0" data-menu-id="1" name="extra-0-15"/>
										<label for="extra-2-0-13">
											<span className="extra-title">Soy Sauce</span>
											<span className="extra-price">£3.50</span>
										</label>
									</div>
									<div className="extras-detail-att">
										<input type="checkbox" id="extra-2-0-14" data-ind="2" data-menucat-id="0" data-menu-id="1" name="extra-0-15"/>
										<label for="extra-2-0-14">
											<span className="extra-title">Garlic Sauce</span>
											<span className="extra-price">£2.50</span>
										</label>
									</div>
								</div>
							</div>
							<div className="extras-btns-holder">
								<button data-menucat-id="0" data-menu-id="1" data-rid="6272" className="add-extra-menu-btn input-button-loader editing-menu" data-rand="21274501">Update</button>
								<a href="#" className="reset-menu-fields btn">Reset Fields</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
    </>
  )
}

export default RestaurantsMenu