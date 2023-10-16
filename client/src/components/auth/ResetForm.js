import React from 'react'

function ResetForm() {
  return (
    <>
     <div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">×</span>
								</button>
								<h5 className="modal-title foodbakery-dev-login-main-title">Forgot Password</h5>
							</div>
							<div className="modal-body">
								<p className="foodbakery-dev-login-top-msg"></p>
								<div className="cs-login-pbox">
									<div className="status status-message"></div>
									<form method="post" className="wp-user-form webkit" id="ControlForm_43687">
								
										<div className="input-filed">
											<i className="icon-unlock-alt"></i>
											<input type="text"   placeholder='Enter Your Email'/>
										</div>
										<div className="input-filed input-field-btn">
											<div className="ajax-login-button input-button-loader">
												<input type="button" className="cs-bgcolor" value="Log in"/>
											</div>
										</div>
									</form>
								</div>
							</div>
    
    
    </>
  )
}

export default ResetForm