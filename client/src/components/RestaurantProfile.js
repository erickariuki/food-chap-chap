import React, { useEffect, useState } from 'react';
import RestaurantSidebar from './RestaurantSidebar';
import RestaurantHeader from './RestaurantHeader';

function RestaurantProfile() {
  const [userr, setUserr] = useState(null);
  const [restaurant, setRestaurant] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    longitude: '',
    latitude: '',
    email: '',
    address: '',
    status: 'open',
    user_id: '' // Added user_id to formData
  });

  useEffect(() => {
    // Fetch user information
    fetch("/me")
      .then((response) => response.json())
      .then((user) => {
        setUserr(user);
        setFormData((prevFormData) => ({
          ...prevFormData,
          user_id: user.id // Set user_id in formData
        }));
      });
  }, []);

  useEffect(() => {
    // Fetch user's restaurant when userr changes
    if (userr) {
      fetch(`/restaurants/${userr.id}`)
        .then((response) => response.json())
        .then((rest) => setRestaurant(rest));
    }
  }, [userr]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
console.log('formdata submit', formData);
    // Send POST request
    fetch('restaurant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data if needed
      })
      .catch((error) => {
        // Handle errors
      });
  };

  if (userr) {
    if (userr.user_type !== "restaurant_owner") {
      window.location.href = "../";
    }
  }

	return (
	  <>
	   {userr && (
    		<div className="main-section">
		<RestaurantHeader userr={userr}/>
			<div className="page-section account-header buyer-logged-in">
				<div className="container">
					<div className="row">
					<RestaurantSidebar />
						<div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
							<div className="user-dashboard loader-holder">
							<div class="user-holder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<div className="element-title has-border right-filters-row">
												
                                                {/* Title  */}
                                                <h5>Register Restaurant</h5>
										
											</div>
										</div>
									</div>



                                    <form onSubmit={handleFormSubmit}>

										<div class="form-fields-set">
											<ul>
												<li>
													<div class="row">
														<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
															<div class="restaurant-info">
																<div class="img-holder">
																	<ul class="foodbakery-gallery-holder">
																		<li class="gal-img">
																			<div class="drag-list">
																				<div class="item-thumb">
																					<img class="thumbnail" src={`${process.env.PUBLIC_URL}/assets/extra-images/${restaurant.image}`} alt=""/>
																				</div>
																				<div class="item-assts">
																					<ul class="list-inline pull-right">
																						<li class="close-btn"><a href="#"><i class="icon-cross-out"></i></a></li>
																					</ul>
																				</div>
																			</div>
																		</li>
																	</ul>
																</div>
																<div class="text-holder">


																	<strong>{restaurant.name}</strong>
																	
                                                                    
                                                                    <div class="upload-gallery">
																		<input class="foodbakery-dev-gallery-uploader" style={{display:"none"}}  type="file"/>
																		<a href="#" class="upload-btn foodbakery-dev-featured-upload-btn">Upload Logo</a>
																	</div>
																	<span>. Max Upload Size: 10MB.</span>
																</div>
															</div>
														</div>
													
														<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Name*</label>
                                                                <input
                                                                    type="text"
                                                                    name="name"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Restaurant Name"
                                                                    value={formData.name}
                                                                    onChange={handleFormChange}
                                                                />

															</div>
														</div>
														<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Restaurant phone</label>
                                                                <input
                                                                    type="text"
                                                                    name="phone"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Restaurant Phone"
                                                                    value={formData.phone}
                                                                    onChange={handleFormChange}
                                                                />                                                               
															</div>
														</div>
														<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Longitude</label>
                                                                <input
                                                                    type="text"
                                                                    name="longitude"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Restaurant Longitude"
                                                                    value={formData.longitude}
                                                                    onChange={handleFormChange}
                                                                />   
															</div>
														</div>
														<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Latitude</label>
                                                                <input
                                                                    type="text"
                                                                    name="latitude"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Restaurant Latitude"
                                                                    value={formData.latitude}
                                                                    onChange={handleFormChange}
                                                                /> 

															</div>
														</div>
														<div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Contact Email</label>
                                                                <input
                                                                    type="text"
                                                                    name="email"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Restaurant Email Address"
                                                                    value={formData.email}
                                                                    onChange={handleFormChange}
                                                                /> 
															</div>
														</div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Address</label>
                                                                <input
                                                                    type="text"
                                                                    name="address"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Restaurant Address"
                                                                    value={formData.address}
                                                                    onChange={handleFormChange}
                                                                /> 
															</div>
														</div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Status</label>
																<select class="chosen-select">
																	<option value="open">Open</option>
																	<option value="close">Closed</option>
																</select>
															</div>
														</div>
													</div>
												</li>
											</ul>
											<div>
												<div class="field-holder">
													<div class="payment-holder input-button-loader">
														<input class="update-restaurant" type="submit" value="Update Restaurant" onclick="location.href='restaurant-location.html';"/>
													</div>
												</div>
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
	   )}
    </>
  )
}

export default RestaurantProfile