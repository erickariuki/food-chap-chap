import React from 'react';
import riderImage from './boxer.jpg';
import './rider.css'; // Import the CSS file

const Rider = () => {
    return (
        <div className="rider-container">
            <div className="rider-wrapper">
                <div className="rider-content">
                    <h1 className="rider-title">Ready To Hit The Road</h1>
                    <p className='body'>We Deliver High Living Standards You Deliver Food </p>
                </div>
                <img src={riderImage} className="rider-image" />
            </div>
            <div className='reg-container'>
                <h1 classname="br">Brand</h1>

                <div className='reg-form'>
                    <div className='title'>
                        <h3 className='now'>Register Now</h3>
                        <p className='welcome'>Welcome Back! Want to Explore the World</p>
                    </div>

                    <div className='form'>
                        <input
                        type='name'
                        placeholder='First Name'
                        className='input' 
                        />
                        <input
                        type='name'
                        placeholder='Last Name'
                        className='input' 
                        />
                        <input
                        type='email'
                        placeholder='Email'
                        className='input' 
                        />
                        <input
                        type='phone'
                        placeholder='Phone Number'
                        className='input' 
                        />
                        <input
                        type='password'
                        placeholder='Password'
                        className='input' 
                        />    
                    </div>
                    <div className='bottom-form'>
                        <div className='remember'>
                            <input type='checkbox' className='check'/>
                            <p className='rem'>Remember Me</p>
                        </div>
                    </div>
                    <div className='bt'>
                        <button className='button'>
                            Register
                        </button>
                    </div>
                </div>

                <div className='footer'>
                    <p className='p'>Have an account?<span className='log'>Log in</span></p>
                </div>
            </div>
        </div>
    );
};

export default Rider;
