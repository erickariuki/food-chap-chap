import React from 'react'
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

function Footer() {
		
	const currentDate = new Date();
  	const currentYear = currentDate.getFullYear();
	 
	const SERVICE_ID = "service_6mnqy2n";
	const TEMPLATE_ID ="template_w49h6bs";
	const PUBLIC_KEY = "E1ZeG4ClRU_5Ud6PG";

	const handleOnSubmit = (e) => {
		e.preventDefault();
		emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
		  .then((result) => {
			console.log(result.text);
			Swal.fire({
			  icon: 'success',
			  title: 'Successfully signed up',
			})
		  }, (error) => {
			console.log(error.text);
			Swal.fire({
			  icon: 'error',
			  title: 'Ooops, something went wrong',
			  text: error.text,
			})
		  });
		e.target.reset()
	  };
	
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
									<form onSubmit={handleOnSubmit}>
										<div className="field-holder">
											<label>
												<i className=" icon-envelope3"></i>
												<input
												 type="email"
												className="field-input"
												 placeholder=" Enter Your Email Address..."
												name="user_email"
												style={{
													color: "black",
												}}
												 />
											</label>
										</div>
										<div className="field-holder btn-holder">
											<input className="subscribe-btn bgcolor" type="submit"   value="Sign Up"/>
										</div>
									</form>
									
							</div>
						</div>
						<div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
							<div className="widget widget_text">
								<div className="widget-title">
									<h5>About us</h5>
								</div>
								<div className="textwidget">
								FoodChapChap streamlines dining with our Pre-Order Service, cutting wait times in half. Whether dining in or taking out, 
								we've got you covered. Our vision is to simplify food ordering for all. Enjoy a seamless, efficient dining experience with 
								us  the future of restaurant convenience
								</div>
							</div>
						</div>
						<div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
							<div className="widget widget-top-cities">
								<div className="widget-title">
									<h5>Popular Cities</h5>
								</div>
								<ul>
									<li><a href="listings.html">Nairobi</a></li>
									<li><a href="listings.html">Mombasa</a></li>
									<li><a href="listings.html">Nakuru</a></li>
									<li><a href="listings.html">Eldoret</a></li>
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
									<li><a href="blogs">Blog Large</a></li>
									<li><a href="admindash/foods">Home</a></li>
									<li><a href="blogs">Blog Masonry</a></li>
									<li><a href="contactus">Contact</a></li>
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
									<p>© {currentYear} FoodChapChap. All Rights Reserved. Powered By <a href="#">foodchapchap</a>.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div> 
			</div>
		</footer>
    </>
  )
};

export default Footer