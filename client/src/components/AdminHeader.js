import React from 'react'

function AdminHeader({user}) {
  return (
    <div className="page-section restaurant-detail-image-section"   style={{
        background: `url(${process.env.PUBLIC_URL}/assets/extra-images/cover-photo01.jpg) no-repeat scroll 0 0 / cover`,
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
										<span className="restaurant-title" style={{textTransform:"capitalize"}}>{user.username}( Admin)</span>
										<div className="text">
											<i className="icon-local_pizza"></i>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
  )
}

export default AdminHeader