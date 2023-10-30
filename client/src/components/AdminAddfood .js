import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

function AdminAddfood({ user  }) {
  // const [userr, setUserr] = useState(null);
  const [restaurant, setRestaurant] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    cuisine_id: '',
    foodtype: '',
    restaurant_id: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState('');


  // useEffect(() => {
  //   fetch("/me")
  //     .then((response) => response.json())
  //     .then((user) => {
  //       setUserr(user);
       
  //     });
  // }, []);


  useEffect(() => {
      fetch(`http://localhost:8080/api/cuisines`)
        .then((response) => response.json())
        .then((cuisines) => setCuisines(cuisines));
  }, []);

// console.log(cuisines)

  useEffect(() => {
    // Fetch user's restaurant when userr changes
    if (user) {
      fetch('http://localhost:8080/restaurants')
        .then((response) => response.json())
        .then((rest) => {
          setRestaurant(restaurant);
          setFormData((prevFormData) => ({
            ...prevFormData,
            restaurant_id: rest.id,
            quantity: 10

          }));
        });
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send POST request
    fetch('http://localhost:8080/api/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then((response) => {
        if (response.ok) {
       
        setIsSuccess(true);
        setMessage('Food Added successfully!');
        } else {
        setIsSuccess(false);
        setMessage('Failed to add food. Please try again.');
        }
      })
      .then((data) => {
        // Handle response data if needed
      })
      .catch((error) => {
        // Handle errors
      });
  };

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
							<div class="user-holder">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
										<div className="row">
											<div className="element-title has-border right-filters-row">
												
                                                {/* Title  */}
                                                <h5>Add Food</h5><br/>
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
																					<img class="thumbnail" src={`${process.env.PUBLIC_URL}/assets/extra-images/one.jpg`} alt=""/>
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


																	<strong>Food Image</strong>
																	
                                                                    
                                                                    <div class="upload-gallery">
																		<input class="foodbakery-dev-gallery-uploader" style={{display:"none"}}  type="file"/>
																		<a href="#" class="upload-btn foodbakery-dev-featured-upload-btn">Upload Image</a>
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
                                                                    placeholder="Food Name"
                                                                    value={formData.name}
                                                                    onChange={handleFormChange}
                                                                />

															</div>
														</div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Description</label>
                                                                <input
                                                                    type="text"
                                                                    name="description"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Food Description"
                                                                    value={formData.description}
                                                                    onChange={handleFormChange}
                                                                />   
															</div>
														</div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Price</label>
                                                                <input
                                                                    type="text"
                                                                    name="price"
                                                                    class="foodbakery-dev-req-field"
                                                                    placeholder="Food price"
                                                                    value={formData.price}
                                                                    onChange={handleFormChange}
                                                                />                                                               
															</div>
														</div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>cuisine</label>
																<select 
                                
                                
                                name='cuisine_id'
                                class="chosen-select"
                                value={formData.cuisine_id}
                                onChange={handleFormChange}
                                
                                
                                >
                                       <option value="">Select Cuisine</option>

                                {cuisines && cuisines.map((cuisine, index) => (
	                                  <option value={cuisine.id}>{cuisine.name}</option>
														))}	

																</select>
															</div>
														</div>
                                                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
															<div class="field-holder">
																<label>Food Type</label>
																<select  
                                    name='foodtype'
                                    class="chosen-select"
                                    value={formData.foodtype}
                                    onChange={handleFormChange}
                                    required
                                    >
                                       <option value="">Select Food Type</option>
																	<option value="0">Fast Food</option>
																	<option value="1">Others</option>
																</select>
															</div>
														</div>
								
													
                                                      
													</div>
												</li>
											</ul>
											<div>
												<div class="field-holder">
													<div class="payment-holder input-button-loader">
														<input class="update-restaurant" type="submit" value="Add Food" onclick="location.href='restaurant-location.html';"/>
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

export default AdminAddfood