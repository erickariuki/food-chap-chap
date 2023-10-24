import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import Restaurants from './Restaurants'
import RestaurantsMenu from './RestaurantsMenu'
import LoginForm from './auth/LoginForm'
import ResetForm from './auth/ResetForm'
import RegisterForm from './auth/RegisterForm'
import Customer from './Customer'
import Restaurantdash from './Restaurantdash'
import { Route, Routes } from 'react-router-dom'



function Main({ onLogin }) {

	const [showLogin, setShowLogin] = useState(true);
	const [showReset, setShowReset] = useState(true);
  return (
    <>
    
    
	<div className="wrapper">
			<Header />

<Routes>
<Route path="/customerdash" element={<Customer />} />
<Route path="/" element={<Home />} />

</Routes>

{/* 
			<Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customerdash" element={<Customer />} />
              <Route path="/restaurantdash" element={<Restaurantdash />} />

              <Route
                path="/restaurants"
                element={<Restaurants />}
              />
            
              <Route path="/restaurant/:id" element={<RestaurantsMenu />} />

            </Routes> */}


			{/* <Restaurantdash /> */}

			{/* <Customer /> */}


			{/* <Home /> */}

			{/* <Restaurants /> */}

			{/* <RestaurantsMenu /> */}

		


			{/* <Route path="/game/:id" element={<MatchDetails allData={allData} />} /> */}

<Footer />
	</div>

	{/* <div className="modal fade" id="sign-in" aria-labelledby="myModalLabel"> */}


	<div className="modal fade in" id="sign-in" aria-labelledby="myModalLabel">
		<div className="modal-dialog">
			<div className="login-form">
				<div className="modal-content">
					<div className="tab-content">
						<div id="user-login-tab" className="tab-pane fade in active">
							
						{showLogin && showReset ? (
        <>
          <LoginForm onLogin={onLogin} />
       

									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
										New Here?
										<span    onClick={() => {
                setShowReset(false);
                setShowLogin(false);
              }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}> Sign Up</span><br/>
									</div>
	   
									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Forgot your password?
										<span    onClick={() => {
                setShowReset(true);
                setShowLogin(false);
              }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}> Reset Password</span>
									</div>


        </>
      ) : showReset && !showLogin ? (
        <>
          <ResetForm onLogin={onLogin} />
    
		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Have an Account?
										<span    onClick={() => setShowLogin(true)}
              data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}> Login</span>
									</div>




        </>
      ) : (
        <>
          <RegisterForm onLogin={onLogin} />
		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Have an Account?
										<span    onClick={() => setShowLogin(true)}
              data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}>  Login</span>
									</div>
     


									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Forgot your password?
										<span    onClick={() => {
                setShowReset(true);
                setShowLogin(false);
              }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch" style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}>  Reset Password</span>
									</div>
        </>
      )}


						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}

export default Main