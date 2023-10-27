import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    function redirectToDashboard(user, token) {
      if (user.user_type === "customer") {
          navigate('/customerdash', { state: { user, token } });
      } else if (user.user_type === "restaurant_owner") {
          navigate('/restaurantdash', { state: { user, token } });
      } else if (user.user_type === "admin") {
          navigate('/admindash', { state: { user, token } });
      }
  }
  

    function handleSubmit(e) {
      e.preventDefault();
  
      fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              credentials: 'include', // Include credentials (cookies, etc.)
          },
          body: JSON.stringify({ username, password }),
      })
          .then((r) => {
              if (r.ok) {
                  r.json().then((response) => {
                      const { user, token } = response;
                      onLogin(user);
  
                      console.log(response);
                      setErrorMessage(null);
                      redirectToDashboard(user, token);
                  });
              } else {
                  r.text().then((errorMessage) => {
                      setErrorMessage(errorMessage || "Login details do not match");
                  });
              }
          })
          .catch((error) => {
              setErrorMessage("An error occurred. Please try again.");
          });
  }
  

    return (
        <>
            <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </button>
                <h5 className="modal-title foodbakery-dev-login-main-title">Login To Your Account</h5>
            </div>
            <div className="modal-body">
                {errorMessage && (
                    <p
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            padding: "10px",
                            marginBottom: "10px",
                            borderRadius: "5px",
                        }}
                    >
                        {errorMessage}
                    </p>
                )}
                <p className="foodbakery-dev-login-top-msg"></p>
                <div className="cs-login-pbox">
                    <div className="status status-message"></div>
                    <form onSubmit={handleSubmit} className="wp-user-form webkit">
                        <div className="input-filed">
                            <i className="icon-user4"></i>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Username"
                                autoComplete="off"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-filed">
                            <i className="icon-unlock-alt"></i>
                            <input
                                className="form-control"
                                type="password"
                                placeholder="Password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-filed input-field-btn">
                            <div className="ajax-login-button input-button-loader">
                                <input type="submit" className="cs-bgcolor" value="Log in" />
                            </div>
                            <div className="text-center my-4">
                                <Link className="" to="/register+your=restaurant">
                                    Register your restaurant
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default LoginForm;
