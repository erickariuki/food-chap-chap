import React from 'react'

function CustomerHeader({ user }) {
  return (
    <div className="page-section restaurant-detail-image-section"    style={{
        background: `url(${process.env.PUBLIC_URL}/assets/extra-images/banner-img-2.jpg) no-repeat scroll 0 0 / cover`,
      }}>
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="company-info-detail">
								<div className="company-info">
									<div className="img-holder">
										<figure>
											<img src={`${process.env.PUBLIC_URL}/assets/extra-images/team-medium-img1.jpg`} alt=""/>
										</figure>
									</div>
									<div className="text-holder">
										<span className="restaurant-title" style={{textTransform:"capitalize"}}>{user.username}(Customer Owner)</span>
										<ul className="user-info-contact">
											<li className="cell"><i className="icon-phone"></i><a href="tel:0123456789">{user.phone}</a></li>
											<li className="email"><i className="icon-mail5"></i><a href="mailto:dum4@foodchapchap.com">{user.email}</a></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
  )
}

export default CustomerHeader