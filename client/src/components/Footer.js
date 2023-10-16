import React from 'react'

function Footer() {
  return (
    <>
    	<footer id="footer" className="footer-style-2">
			<div className="footer-widget">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="widget widget-newsletter">
								<div className="widget-title">
									<h5>Subscribe to our Newsletter</h5>
								</div>
								<div className="fieldset">
									<form action="#">
										<div className="field-holder">
											<label>
												<i className=" icon-envelope3"></i>
												<input type="text" className="field-input" placeholder=" Enter Your Email Address..."/>
											</label>
										</div>
										<div className="field-holder btn-holder">
											<input className="subscribe-btn bgcolor" type="button" onClick="location.href='registration.html'" value="Sign Up"/>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							<div className="widget widget_text">
								<div className="widget-title">
									<h5>About us</h5>
								</div>
								<div className="textwidget">Foodbakery is the business of food and restaurants.
									Ridiculus sociosqu cursus neque cursus curae ante scelerisque vehicula.
									Explore restaurants, bars, and cafés by locality cum doctus civibus
									efficiantur in imperdiet deterruisset. FoodBakery Just ordered me some grub
								</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
							<div className="widget widget-top-cities">
								<div className="widget-title">
									<h5>Popular Cities</h5>
								</div>
								<ul>
									<li><a href="listings.html">Aberaeron</a></li>
									<li><a href="listings.html">Aberdeenshire</a></li>
									<li><a href="listings.html">Anston</a></li>
									<li><a href="listings.html">Ascot</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
							<div className="widget widget-top-cities">
								<div className="widget-title">
									<h5>Popular Cuisines</h5>
								</div>
								<ul>
									<li><a href="listings.html">BB.Q</a></li>
									<li><a href="listings.html">ChickenRoast</a></li>
									<li><a href="listings.html">Cold Coffee</a></li>
									<li><a href="listings.html">Cold Drink</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
							<div className="widget widget-categories">
								<div className="widget-title">
									<h5>Menu</h5>
								</div>
								<ul>
									<li><a href="blog-large.html">Blog Large</a></li>
									<li><a href="blog-medium.html">Blog Medium</a></li>
									<li><a href="blog-medium.html">Blog Masonry</a></li>
									<li><a href="contact-us.html">Contact</a></li>
									<li><a href="faq.html">FAQ’s</a></li>
									<li><a href="how-it-works.html">How itworks</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							<div className="widget widget-connect">
								<div className="widget-title">
									<h5> Connect</h5>
								</div>
								<ul>
									<li><span className="bgcolor"><i className="icon-ring_volume"></i></span>
										<p>+1 123 456 7892</p>
									</li>
									<li><span className="bgcolor"><i className="icon-envelope-o"></i></span>
										<p><a href="#">support@foodchapchap.com</a>
										</p>
									</li>
									<li><span className="bgcolor"><i className="icon-location-pin2"></i></span>
										<p>33 - B, 2nd Floor, Saint Jhon Doe Appartments, Sussex, UK.26AL565C.</p>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="copyright-sec">
				<div className="container">
					<div className="row">
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
							<div className="copyright-inner">
								<div className="copy-right">
									<p>© 2017 Foodbakery. All Rights Reserved. Powered By <a href="#">foodchapchap</a>.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> 
		</footer>
    </>


  )
}

export default Footer