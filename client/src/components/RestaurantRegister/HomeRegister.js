import React from "react";
import { Link } from "react-router-dom";
import "../css/HomeRegister.css";

function HomeRegister() {
  return (
    <div className="home-register-wrapper">
      <h1>Join us at FoodChapChap to unclock your restaurant potential</h1>

      <div className="home-register-bottom">
        <p>
          Are you tired of the everyday dining frustrations at your restaurant?
          We understand the challenges you face, and we have a solution that can
          change the game for you. FoodChapChap is your gateway to a new era of
          restaurant service, focused on convenience, simplicity, and
          efficiency.
        </p>
        <button className="button">
          <Link to="/register+your=restaurant/create+restaurant=form">
            Register Restaurant
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HomeRegister;
