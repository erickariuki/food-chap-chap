import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";

function Restaurants({ restaurants }) {
  //state hooks
  const [restaurantList, setRestaurantList] = useState([]);
  const [liked, setLiked] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(false);
  const [checkedMenu, setCheckedMenu] = useState([]);
  const [restaurantWithItems, setRestaurantsWithItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState(false);

  useEffect(() => {
    let openRestaurants = [];
    if (open === true && close === true && checkedMenu.length === 0) {
      setRestaurantsWithItems(restaurantList);
      console.log("123");
    }
    if (open == true && close == false && checkedMenu.length === 0) {
      restaurantList.forEach((restaurant) => {
        const isOpen = calculateStatus(restaurant);
        if (isOpen === true) {
          openRestaurants.push(restaurant);
        }
      });
      setRestaurantsWithItems(openRestaurants);
    }
    if (open == false && close == true && checkedMenu.length === 0) {
      let closedRestaurants = [];
      restaurantList.forEach((restaurant) => {
        const isClose = calculateStatus(restaurant);
        if (isClose === false) {
          closedRestaurants.push(restaurant);
        }
      });
      setRestaurantsWithItems(closedRestaurants);
    }
    if (open == true && close === true && checkedMenu.length >= 1) {
      findRestaurants(checkedMenu);
    }
  }, [open, close, checkedMenu]);

  const handleOpen = () => {
    setOpen(!open);
    console.log("open:", open);
    console.log("close:", close);

    const openRestaurants = [];
    if (restaurantWithItems.length === 0 && open === false) {
      restaurantList.forEach((restaurant) => {
        const isOpen = calculateStatus(restaurant);
        if (isOpen === true) {
          openRestaurants.push(restaurant);
        }
      });
      setRestaurantsWithItems(openRestaurants);
    }
    if (checkedMenu.length === 0 && open === true) {
      setRestaurantsWithItems([]);
    }
    if (restaurantWithItems.length > 0 && open === false) {
      restaurantWithItems.forEach((restaurant) => {
        const isOpen = calculateStatus(restaurant);
        if (isOpen === true) {
          openRestaurants.push(restaurant);
        }
      });
      setRestaurantsWithItems(openRestaurants);
    }
    if (checkedMenu.length >= 1 && open === true) {
      findRestaurants(checkedMenu);
    }
  };
  const handleClose = () => {
    setClose(!close);
    const closedRestaurants = [];
    if (restaurantWithItems.length === 0 && close === false) {
      restaurantList.forEach((restaurant) => {
        const isClose = calculateStatus(restaurant);
        if (isClose === false) {
          closedRestaurants.push(restaurant);
        }
      });
      setRestaurantsWithItems(closedRestaurants);
    }
    if (checkedMenu.length === 0 && close === true) {
      setRestaurantsWithItems([]);
    }
    if (restaurantWithItems.length > 0 && close === false) {
      restaurantWithItems.forEach((restaurant) => {
        const isClose = calculateStatus(restaurant);
        if (isClose === false) {
          closedRestaurants.push(restaurant);
        }
      });
      setRestaurantsWithItems(closedRestaurants);
    }
    if (checkedMenu.length >= 1 && close === true) {
      findRestaurants(checkedMenu);
    }
  };
  const [cuisines, setCuisines] = useState([
    "Apple Juice",
    "BB.Q",
    "Beef Roast",
    "Carrot Juice",
    "Cheese Burger",
    "Chicken Roast",
  ]);
  useEffect(() => {
    fetch("http://localhost:8080/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error("response not ok");
        }
        return response.json();
      })
      .then((list) => {
        setRestaurantList(list.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const calculateStatus = (restaurant) => {
    if (restaurant && restaurant.openingHours) {
      if (restaurant.openingHours === "full time") {
        return true;
      } else {
        const [start, end] = restaurant.openingHours.split("-").map((time) => {
          const [hour, minute] = time.split(":").map(Number);
          return hour * 60 + minute;
        });

        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTime = currentHour * 60 + currentMinute;

        if (start <= end) {
          return currentTime >= start && currentTime <= end;
        } else {
          return currentTime >= start || currentTime <= end;
        }
      }
    }

    return false; // Default to false if no valid openingHours
  };

  const findRestaurants = (updatedCheckedMenu) => {
    let associatedRestaurants = [];

    if (updatedCheckedMenu.length === 0) {
      setRestaurantsWithItems([]);
    } else {
      restaurantList.forEach((restaurant) => {
        const menuItems = restaurant.cuisines;

        if (
          menuItems &&
          updatedCheckedMenu.every((item) => menuItems.includes(item))
        ) {
          associatedRestaurants.push({ ...restaurant });
        }
      });
    }

    setRestaurantsWithItems(associatedRestaurants);
  };

  const handleCheckboxChange = (event) => {
    const menuItem = event.target.value;
    const updatedMenu = [...checkedMenu];

    if (event.target.checked) {
      updatedMenu.push(menuItem);
    } else {
      const index = updatedMenu.indexOf(menuItem);
      if (index > -1) {
        updatedMenu.splice(index, 1);
      }
    }

    setCheckedMenu(updatedMenu);
    findRestaurants(updatedMenu);
  };
  //sort logic
  const sortByAlphabet = () => {
    const sortedArray = [...restaurantWithItems].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setRestaurantsWithItems(sortedArray);
  };
  const sortByRatings = () => {
    const sortedArray = [...restaurantWithItems].sort((a, b) => {
      const averageRatingA = calculateAverage(a.ratings);
      const averageRatingB = calculateAverage(b.ratings);
      return averageRatingB - averageRatingA;
    });
    setRestaurantsWithItems(sortedArray);
  };

  function calculateAverage(ratings) {
    if (ratings.length === 0) return 0;
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return sum / ratings.length;
  }
  const sortByMinOrderValue = () => {
    const sortedArray = [...restaurantWithItems].sort(
      (a, b) => a.minimum_order_value - b.minimum_order_value
    );
    setRestaurantsWithItems(sortedArray);
  };

  const sortByDeliveryFee = () => {
    const sortedArray = [...restaurantWithItems].sort(
      (a, b) => a.delivery_fee - b.delivery_fee
    );
    setRestaurantsWithItems(sortedArray);
  };

  const sortByDeliveryTime = () => {
    const sortedArray = [...restaurantWithItems].sort(
      (a, b) => a.delivery_time - b.delivery_time
    );
    setRestaurantsWithItems(sortedArray);
  };

  return (
    <>
      <div className="main-section">
        <div
          className="page-section nopadding cs-nomargin"
          style={{
            marginTop: "0px",
            paddingTop: "80px",
            paddingBottom: "60px",
            marginBottom: "0px",
            background: `url(${process.env.PUBLIC_URL}/assets/extra-images/banner-img-2.jpg) no-repeat scroll 0 0 / cover`,
          }}
        >
          <div className="container ">
            <div className="row">
              <div className="section-fullwidth col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                    <div className="row">
                      <div className="listing-main-search">
                        <div className="main-search">
                          <form action="#">
                            <div className="restaurant-search-element-container row">
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="field-holder">
                                  {" "}
                                  <span className="restaurant-element-search-btn">
                                    <i className="icon-search5"></i>{" "}
                                  </span>
                                  <input
                                    placeholder="Resturant name"
                                    name="search_title"
                                    value=""
                                    type="text"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="field-holder">
                                  {" "}
                                  <span>
                                    {" "}
                                    <i className="icon-location search-by-location-icon"></i>
                                  </span>
                                  <ul>
                                    <li className="select-location">
                                      <div className="foodbakery-locations-fields-group foodbakery-focus-out">
                                        <span
                                          id="foodbakery_radius_location_open333"
                                          className="foodbakery-radius-location"
                                        >
                                          <i className="icon-target5"></i>
                                        </span>
                                        <input
                                          type="text"
                                          className="location-field-text filter"
                                          placeholder="All Locations"
                                        />
                                      </div>
                                      <div
                                        className="select-location"
                                        id="foodbakery-radius-range333"
                                        style={{ display: "none" }}
                                      >
                                        <div className="select-popup popup-open">
                                          <a
                                            id="location_close_popup333"
                                            href="javascript:0;"
                                            className="location-close-popup"
                                          >
                                            <i className="icon-times"></i>
                                          </a>
                                          <input
                                            type="hidden"
                                            className="foodbakery-radius"
                                            name="foodbakery_radius"
                                            value="10"
                                          />
                                          <p>Show with in</p>
                                          <input
                                            id="ex16b333"
                                            type="text"
                                            data-value="10"
                                            value="10"
                                            style={{ display: "none" }}
                                          />

                                          <span>
                                            Miles:{" "}
                                            <span id="ex16b333CurrentSliderValLabel">
                                              10
                                            </span>
                                          </span>
                                          <br />
                                          <p className="my-location">
                                            of{" "}
                                            <i className="cs-color icon-location-arrow"></i>
                                            <a
                                              id="foodbakery-geo-location-all"
                                              className="cs-color foodbakery-geo-location313324"
                                              href="javascript:void(0)"
                                            >
                                              My location
                                            </a>
                                          </p>
                                        </div>
                                      </div>
                                    </li>
                                  </ul>
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
          </div>
        </div>
        <div
          className="page-section nopadding cs-nomargin"
          style={{
            marginTop: "0px",
            paddingTop: "60px",
            paddingBottom: "10px",
            marginBottom: "0px",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <aside className="col-lg-2 col-md-2 col-sm-12 col-xs-12">
                    <div className="filter-wrapper">
                      <div className="foodbakery-filters listing-filter">
                        <div className="filter-holder panel-default">
                          <div className="filter-heading">
                            <h6>
                              <i className="icon-food"></i>Cuisines
                            </h6>
                          </div>
                          <div className="select-categories">
                            <ul className="filter-list cs-checkbox-list">
                              {cuisines.map((item) => (
                                <div className="checkbox" key={item}>
                                  <input
                                    type="checkbox"
                                    id={`foodbakery_restaurant_category_${item}`}
                                    className="foodbakery_restaurant_category"
                                    value={item}
                                    onChange={handleCheckboxChange}
                                  />
                                  <label
                                    for={`foodbakery_restaurant_category_${item}`}
                                  >
                                    {item}
                                  </label>
                                </div>
                              ))}

                              <li className="expand">See more cuisines</li>
                            </ul>
                          </div>
                        </div>
                        <div className="filter-holder panel-default">
                          <div className="filter-heading">
                            <h6>
                              <i className="icon-clock4"></i>Opening Status
                            </h6>
                          </div>
                          <div className="select-categories restaurant_timings">
                            <ul className="filter-list cs-parent-checkbox-list">
                              <li>
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="restaurant_timings_open"
                                    name="restaurant_timings_checkbox"
                                    className=""
                                    value="open"
                                    checked={open}
                                    onChange={handleOpen}
                                  />
                                  <label for="restaurant_timings_open">
                                    Open Now
                                    <span>(5)</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="restaurant_timings_close"
                                    name="restaurant_timings_checkbox"
                                    className="restaurant_timings_close"
                                    value="close"
                                    checked={close}
                                    onChange={handleClose}
                                  />
                                  <label for="restaurant_timings_close">
                                    Closed Now
                                    <span>(10)</span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="filter-holder panel-default">
                          <div className="filter-heading">
                            <h6>
                              <i className="icon-external-link"></i>Pre Orders
                            </h6>
                          </div>

                          <div className="select-categories restaurant_pre_order">
                            <ul className="filter-list cs-parent-checkbox-list">
                              <li>
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="restaurant_pre_order_yes"
                                    name="restaurant_pre_order_checkbox"
                                    className="restaurant_pre_order_yes"
                                    value="yes"
                                  />
                                  <label for="restaurant_pre_order_yes">
                                    Yes
                                    <span>(11)</span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="restaurant_pre_order_no"
                                    name="restaurant_pre_order_checkbox"
                                    className="restaurant_pre_order_no"
                                    value="no"
                                  />
                                  <label for="restaurant_pre_order_no">
                                    No <span>(4)</span>
                                  </label>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="filter-holder panel-default">
                          <div className="filter-heading">
                            <h6>
                              <i className="icon-folder_special"></i>Specials
                            </h6>
                          </div>
                          <div className="select-categories">
                            <ul className="filter-list cs-checkbox-list">
                              <li>
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="specials_1"
                                    className="specials"
                                    value="deals"
                                  />
                                  <label for="specials_1">Deals</label>
                                  <span>(5)</span>
                                </div>
                              </li>
                              <li>
                                <div className="checkbox">
                                  <input
                                    type="checkbox"
                                    id="specials_2"
                                    className="specials"
                                    value="free-delivery"
                                  />
                                  <label for="specials_2">Free Delivery</label>
                                  <span>(12)</span>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </aside>
                  <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                    <div className="listing-sorting-holder">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <h4>
                            {restaurantWithItems.length} Restaurant's found
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="listing simple">
                      {restaurantWithItems.map((val) => (
                        <div key={val.id}>
                          {/* <img src={val.image} alt={(val.name, "logo")} /> */}
                          {liked ? (
                            <AiFillHeart onClick={() => setLiked(!liked)} />
                          ) : (
                            <AiOutlineHeart onClick={() => setLiked(!liked)} />
                          )}
                          <ul>{currentStatus}</ul>
                          {[
                            ...Array(Math.floor(calculateAverage(val.ratings))),
                          ].map((_, index) => (
                            <AiFillStar key={index} />
                          ))}
                          {[
                            ...Array(
                              5 - Math.floor(calculateAverage(val.ratings))
                            ),
                          ].map((_, index) => (
                            <AiOutlineStar key={index} />
                          ))}
                          <ul>{calculateStatus(val) ? "Open" : "Closed"}</ul>
                          <ul>{val.openingHours}</ul>
                          <ul>{val.name}</ul>
                          <ul>{val.location}</ul>
                          <ul>{val.contact}</ul>
                          <ul>Type of food:{val.cuisines}</ul>
                          <button>VIEW MENU</button>
                          <br />
                        </div>
                      ))}
                      {/* <ul>
                        {restaurants.map((restaurant) => (
                          <li key={restaurant._id}>
                            <div className="img-holder">
                              <figure>
                                <a href="#">
                                  <img
                                    src={restaurant.image}
                                    className="img-list wp-post-image"
                                    alt="#"
                                  />
                                </a>
                              </figure>
                              <span
                                className={`restaurant-status ${
                                  restaurant.openingHours === "full time"
                                    ? "open"
                                    : "closed"
                                }`}
                              >
                                <em className="bookmarkRibbon"></em>
                                {restaurant.openingHours === "full time"
                                  ? "Open"
                                  : "Closed"}
                              </span>
                            </div>
                            <div className="text-holder">
                              <div className="list-rating">
                                <div className="rating-star">
                                  <span
                                    className="rating-box"
                                    style={{ width: "100%" }}
                                  ></span>
                                </div>
                                <span className="reviews">(1)</span>
                              </div>
                              <div className="post-title">
                                <h5>
                                  <a href="1">{restaurant.name}</a>
                                </h5>
                              </div>
                              <span className="post-categories">
                                <span>
                                  Type of food:{" "}
                                  {Array.isArray(restaurant.cuisines)
                                    ? restaurant.cuisines.join(", ")
                                    : "N/A"}
                                </span>
                              </span>
                              <div className="delivery-potions">
                                <div className="post-time">
                                  <i className="icon-clock4"></i>
                                  <div className="time-tooltip">
                                    <div className="time-tooltip-holder">
                                      <b className="tooltip-label">
                                        Preparing Time
                                      </b>
                                      <b className="tooltip-info">
                                        Estimated Cook Time 15 minutes.
                                      </b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="list-option">
                              <a
                                href="#"
                                className="shortlist-btn"
                                data-toggle="modal"
                                data-target="#sign-in"
                              >
                                <i className="icon-heart-o"></i>
                              </a>
                              <NavLink
                                className="viewmenu-btn text-color"
                                to={`/${restaurant._id}`}
                              >
                                View Menu
                              </NavLink>
                            </div>
                          </li>
                        ))}
                      </ul> */}
                    </div>

                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="page-nation">
                          <ul className="pagination pagination-large">
                            <li className="disabled">
                              <span>Prev</span>
                            </li>
                            <li className="active">
                              <span>
                                <a className="page-numbers active">1</a>
                              </span>
                            </li>
                            <li>
                              <a href="#">2</a>
                            </li>
                            <li>
                              <a href="#">Next</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="section-sidebar col-lg-3 col-md-3 col-sm-12 col-xs-12">
                    <div className="order-sort-results">
                      <h5>Sort By </h5>
                      <ul>
                        <li className="active">
                          <a href="#" className="sort-by-best_match">
                            <i className="icon-thumbs-up2"></i>Best Match
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="sort-by-alphabetical"
                            onClick={sortByAlphabet}
                          >
                            <i className="icon-sort-alpha-asc"></i>Alphabetical
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="sort-by-ratings"
                            onClick={sortByRatings}
                          >
                            {" "}
                            <i className="icon-star-o"></i>Ratings
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="sort-by-minimum_order_value"
                            onClick={sortByMinOrderValue}
                          >
                            <i className="icon-user-minus"></i>Minimum order
                            value
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="sort-by-delivery_fee"
                            onClick={sortByDeliveryFee}
                          >
                            <i className="icon-dollar"></i>Delivery fee
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="sort-by-fastest_delivery"
                            onClick={sortByDeliveryTime}
                          >
                            <i className="icon-fast-forward"></i>Fastest
                            delivery
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div
                      className="message-box"
                      style={{ backgroundColor: "#00a474" }}
                    >
                      <strong>Can’t find a Restaurant?</strong>
                      <span>
                        If you can't find the Restaurant that you want to Order,
                        request to add in our list
                      </span>
                      <a href="#" className="request-btn">
                        Restaurant Request
                      </a>
                    </div>
                    <div
                      className="message-box"
                      style={{ backgroundColor: "#fa9918;" }}
                    >
                      <strong>I‘ m not Listed!</strong>
                      <span>
                        is your restaurant or business not listed on over site
                      </span>
                      <a href="#" className="request-btn">
                        Add Your business!
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Restaurants;
