import React, { useState } from 'react'

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    function redirectToDashboard(user) {
        if (user.user_type === "customer") {
          window.location.href = "/customerdash";
        } else if (user.user_type === "restaurant_owner") {
          window.location.href = "/restaurantdash";
        } else if (user.user_type === "admin") {
          window.location.href = "/admindash";
        }
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        fetch("http://localhost:8080/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        })
          .then((r) => {
            if (r.ok) {
              r.json().then((user) => {
                onLogin(user);
                setErrorMessage(null);
                redirectToDashboard(user);
              });
            } else {
              setErrorMessage("Login details do not match");
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
								<h5 className="modal-title foodbakery-dev-login-main-title">Login To Your Account
                                <br/>
                          
                                
                                </h5>
                            
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
												<input type="submit" className="cs-bgcolor" value="Log in"/>
											</div>
										</div>
									</form>
								</div>
							</div>
   
   </>
  )
}

export default LoginForm