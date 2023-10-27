import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
// import Main from './components/main';
import ReCAPTCHA from './components/RecaptchaForm';
import TermsAndConditionsPage from './components/TermsAndConditionPage.js'; 
// import LoyaltyPoints from './components/LoyaltyPoints';


import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Restaurants from './components/Restaurants'

import LoginForm from './components/auth/LoginForm'
import ResetForm from './components/auth/ResetForm'
import RegisterForm from './components/auth/RegisterForm'

import Restaurantdash from './components/Restaurantdash'

import BlogProfile from './components/blog/BlogProfile';
import { useEffect, useState } from 'react';
import Customer from './components/Customer';
 import LoyaltyPoints from './components/LoyaltyPoints';
import RestaurantsMenu from './components/RestaurantsMenu';
import AdminDash from './components/admindash';
import CustomerOrders from './components/CustomerOrders';
import CustomerProfile from './components/CustomerProfile';
import CustomerReviews from './components/CustomerReviews';
import CustomerBookings from './components/CustomerBookings';
import CustomerStatements from './components/CustomerStatements';
import RestaurantProfile from './components/RestaurantProfile';
import RestaurantFoods from './components/RestaurantFoods';
import RestaurantAddfood from './components/RestaurantAddfood';
import RestaurantReviews from './components/RestaurantReviews';
import RestaurantSettlements from './components/RestaurantSettlements';
import RestaurantBookings from './components/RestaurantBookings';
import RestaurantPassword from './components/RestaurantPassword';
import AdminProfile from './components/AdminProfile';
import AdminAddfood from './components/AdminAddfood ';
import AdminFoods from './components/AdminFoods';
import AdminReviews from './components/AdminReviews';
import AdminSettlements from './components/AdminSettlements';
import AdminBookings from './components/AdminBookings';
import AdminPassword from './components/AdminPassword';
import AdminRestaurants from './components/AdminRestaurants';
import BlogPage from './components/blog/BlogPage';
import CreateBlog from './components/blog/CreateBlog';
import ContactMe from './components/ContactUs';
import UserProfile from './components/UserProfile';
import BlogDetail from './components/blog/BlogDetail';
import axios from 'axios';
import NotAdmin from './components/NotAdmin';

function App() {
  const [foods, setFoods] = useState([]);
  const [cart, setCart] = useState(0);
  const [orders, setOrders] = useState([]);
  const [allorders, setAllOrders] = useState([]);
  const [restaurants, SetRestaurants] = useState([]);
  const [user, setUser] = useState(null);
  const [modal, setModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
	const [showReset, setShowReset] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios
        .get('http://localhost:8080/api/user', {
            withCredentials: true, // Include credentials (cookies, etc.)
        })
        .then((response) => {
            setUser(response.data);
        })
        .catch((error) => {
            console.error(error);
            // Handle error or redirect to login
        });
}, []);
// console.log(user);

  useEffect(() => {
    fetch("/blogs")
              .then((r) => r.json())
              .then((blogs) => setBlogs(blogs));
 }, []);


  useEffect(() => {
    fetch("/restaurants")
              .then((r) => r.json())
              .then((restaurants) => SetRestaurants(restaurants));
 }, []);


 useEffect(() => {
  fetch("/orders")
            .then((r) => r.json())
            .then((orders) => setOrders(orders));
}, []);



  function handleAddFood(newFood) {
    setFoods([...foods, newFood]);
  }

  function handleDeleteFood(id) {
    const updatedFoods = foods.filter((food) => food.id !== id);
    setFoods(updatedFoods);
  }

  function handleLogout() {
    setUser(null);
    window.location.href = "../";
  }

  const handleUpdateCart = (value) => {
    setCart(value);
  };

  // if (!user) return <Main onLogin={setUser} />;
  return (
    <>
    
	<div className="wrapper">
			<Header user={user} onLogout={handleLogout} cart={cart}/>
      <Routes> 
      <Route path="/termsandconditions" element={ <TermsAndConditionsPage />} />
     

<Route path="/" element={<Home />} />
<Route path="/customerdash" element={<Customer restaurants= {restaurants} user={user}/>} />
<Route path="/customerdash/orders" element={<CustomerOrders restaurants= {restaurants} orders={orders}/>} />
<Route path="/customerdash/profile" element={<CustomerProfile restaurants= {restaurants} orders={orders}/>} />

<Route path="/customerdash/loyalty points" element={<LoyaltyPoints />} />

<Route path="/customerdash/reviews" element={<CustomerReviews restaurants= {restaurants} orders={orders}/>} />
<Route path="/customerdash/bookings" element={<CustomerBookings restaurants= {restaurants} orders={orders}/>} />
<Route path="/customerdash/statements" element={<CustomerStatements restaurants= {restaurants} orders={orders}/>} />

<Route path="/notanadmin" element={<NotAdmin />} />
<Route path="/admindash" element={<AdminDash  user={user}/>} />
<Route path="/admindash/profile" element={<AdminProfile />} />
<Route path="/admindash/addfood" element={<AdminAddfood />} />
<Route path="/admindash/foods" element={<AdminFoods />} />
<Route path="/admindash/reviews" element={<AdminReviews />} />
<Route path="/admindash/settlements" element={<AdminSettlements />} />
<Route path="/admindash/bookings" element={<AdminBookings />} />
<Route path="/admindash/password/termsandconditions" element={<AdminPassword />} />
<Route path="/admindash/restaurants" element={<AdminRestaurants/>} />
<Route path="/blogs/createblog" element={<CreateBlog/>} />
<Route path="/blogs" element={<BlogPage blogs={blogs}  />} />

 <Route path="/blogprofile/:id" element={<BlogProfile users={users} blogs={blogs} />} />

<Route path="/blog/fullcontent/:id" element={<BlogDetail blogs={blogs}  />} />

<Route path="/contactus" element={<ContactMe />} />
<Route path="/restaurantdash" element={<Restaurantdash />} />
<Route path="/restaurantdash/profile" element={<RestaurantProfile  user={user}/>} />
<Route path="/restaurantdash/addfood" element={<RestaurantAddfood />} />
<Route path="/restaurantdash/foods" element={<RestaurantFoods />} />
<Route path="/restaurantdash/reviews" element={<RestaurantReviews />} />
<Route path="/restaurantdash/settlements" element={<RestaurantSettlements />} />
<Route path="/restaurantdash/bookings" element={<RestaurantBookings />} />
<Route path="/restaurantdash/password" element={<RestaurantPassword />} />


<Route path="/restaurants/:id" element={<RestaurantsMenu restaurants= {restaurants} foods={foods} username={user} updateCart={handleUpdateCart}/>} />
<Route path="/restaurants" element={<Restaurants restaurants= {restaurants} />}/>
<Route path="/me" element={<UserProfile />} />
</Routes>
<Footer />
	</div>
	<div className="modal fade in" id="sign-in" aria-labelledby="myModalLabel">
		<div className="modal-dialog">
			<div className="login-form">
				<div className="modal-content">
					<div className="tab-content">
						<div id="user-login-tab" className="tab-pane fade in active">
							
						{showLogin && showReset ? (
              
        <>
          <LoginForm onLogin={setUser} />
          <ReCAPTCHA/>
         



    
          
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
          <ResetForm onLogin={setUser} />
    
		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Have an Account?
										<span    onClick={() => {
                  setShowReset(true);
                  setShowLogin(true);
                    }
                  }
              data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
				textDecoration: 'underline',
				color: '#5454ff',
				paddingLeft: '5px'
			  }}> Login</span>
									</div>




        </>
      ) : (
        <>
          <RegisterForm onLogin={setUser} />
		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
									Have an Account?
                  <span    onClick={() => {
                  setShowReset(true);
                  setShowLogin(true);
                    }
                  }
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
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import { Link, Route, Routes } from 'react-router-dom';
// // import Main from './components/main';
// import ReCAPTCHA from './components/RecaptchaForm';
// import TermsAndConditionsPage from './components/TermsAndConditionPage.js'; 
// // import LoyaltyPoints from './components/LoyaltyPoints';


// import Header from './components/Header'
// import Footer from './components/Footer'
// import Home from './components/Home'
// import Restaurants from './components/Restaurants'

// import LoginForm from './components/auth/LoginForm'
// import ResetForm from './components/auth/ResetForm'
// import RegisterForm from './components/auth/RegisterForm'
// import RestaurantSignup from './components/auth/SignUp';

// import Restaurantdash from './components/Restaurantdash'

// import BlogProfile from './components/blog/BlogProfile';
// import { useEffect, useState } from 'react';
// import Customer from './components/Customer';
//  import LoyaltyPoints from './components/LoyaltyPoints';
// import RestaurantsMenu from './components/RestaurantsMenu';
// import AdminDash from './components/admindash';
// import CustomerOrders from './components/CustomerOrders';
// import CustomerProfile from './components/CustomerProfile';
// import CustomerReviews from './components/CustomerReviews';
// import CustomerBookings from './components/CustomerBookings';
// import CustomerStatements from './components/CustomerStatements';
// import RestaurantProfile from './components/RestaurantProfile';
// import RestaurantFoods from './components/RestaurantFoods';
// import RestaurantAddfood from './components/RestaurantAddfood';
// import RestaurantReviews from './components/RestaurantReviews';
// import RestaurantSettlements from './components/RestaurantSettlements';
// import RestaurantBookings from './components/RestaurantBookings';
// import RestaurantPassword from './components/RestaurantPassword';
// import AdminProfile from './components/AdminProfile';
// import AdminAddfood from './components/AdminAddfood ';
// import AdminFoods from './components/AdminFoods';
// import AdminReviews from './components/AdminReviews';
// import AdminSettlements from './components/AdminSettlements';
// import AdminBookings from './components/AdminBookings';
// import AdminPassword from './components/AdminPassword';
// import AdminRestaurants from './components/AdminRestaurants';
// import BlogPage from './components/blog/BlogPage';
// import CreateBlog from './components/blog/CreateBlog';
// import ContactMe from './components/ContactUs';
// import UserProfile from './components/UserProfile';
// import BlogDetail from './components/blog/BlogDetail';
// import axios from 'axios';
// import RegisterRestaurant from './components/auth/RegisterRestaurant';


// function App() {
//   const [foods, setFoods] = useState([]);
//   const [cart, setCart] = useState(0);
//   const [orders, setOrders] = useState([]);
//   const [allorders, setAllOrders] = useState([]);
//   const [restaurants, setRestaurants] = useState([]);
//   const [user, setUser] = useState(null);
//   const [modal, setModal] = useState(false);
//   const [showLogin, setShowLogin] = useState(true);
// 	const [showReset, setShowReset] = useState(true);
//   const [blogs, setBlogs] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [yummypoints , setYummyPoints] = useState([]);

//   useEffect(() => {
//     // auto-login
//     axios.get("http://localhost:8080/api/user")
//       .then((response) => {
//         if (response.status === 200) {
//           setUser(response.data);
//           console.log(response.data);
  
//           if (response.data && response.data.id) {
//             // Fetch user-related data
//             axios.get(`/orders/${response.data.id}`)
//               .then((orderResponse) => setOrders(orderResponse.data))
//               .catch((orderError) => {
//                 console.error("Error fetching orders:", orderError);
//               });
  
//             axios.get("/Points")
//               .then((pointsResponse) => setFoods(pointsResponse.data))
//               .catch((pointsError) => {
//                 console.error("Error fetching points:", pointsError);
//               });
  
//             axios.get("/blogs")
//               .then((blogsResponse) => setBlogs(blogsResponse.data))
//               .catch((blogsError) => {
//                 console.error("Error fetching blogs:", blogsError);
//               });
  
//             axios.get("/users")
//               .then((usersResponse) => setUsers(usersResponse.data))
//               .catch((usersError) => {
//                 console.error("Error fetching users:", usersError);
//               });
  
//             axios.get("/orders")
//               .then((allOrdersResponse) => setAllOrders(allOrdersResponse.data))
//               .catch((allOrdersError) => {
//                 console.error("Error fetching all orders:", allOrdersError);
//               });
//           } else {
//             // Set modal to true if there is no logged-in user
//             setModal(true);
//           }
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching user:", error);
//       });
//   }, []);

//   useEffect(() => {
//     fetch("/blogs")
//               .then((r) => r.json())
//               .then((blogs) => setBlogs(blogs));
//  }, []);

//  useEffect(() => {
//   fetch("/yummypoints")
//             .then((r) => r.json())
//             .then((yummypoints) => setYummyPoints(yummypoints));
// }, []);


// //   useEffect(() => {
// //     fetch("/restaurants")
// //               .then((r) => r.json())
// //               .then((restaurants) => SetRestaurants(restaurants));
// //  }, []);

// useEffect(() => {
//   // Fetch the restaurant data when the component mounts
//   axios.get('http://localhost:8080/restaurants')
//     .then((response) => {
//       const restaurantsData = response.data;
//       setRestaurants(restaurantsData);
//       console.log(restaurantsData);
//     })
//     .catch((error) => {
//       console.error('An error occurred:', error);
//     });
// }, []);






//   function handleAddFood(newFood) {
//     setFoods([...foods, newFood]);
//   }

//   function handleDeleteFood(id) {
//     const updatedFoods = foods.filter((food) => food.id !== id);
//     setFoods(updatedFoods);
//   }

//   function handleLogout() {
//     setUser(null);
//     window.location.href = "../";
//   }

//   const handleUpdateCart = (value) => {
//     setCart(value);
//   };

//   // if (!user) return <Main onLogin={setUser} />;
//   return (
//     <>
    
// 	<div className="wrapper">
// 			<Header user={user} onLogout={handleLogout} cart={cart}/>
//       <Routes> 
//       <Route path="/termsandconditions" element={ <TermsAndConditionsPage />} />
     

// <Route path="/" element={<Home />} />
// <Route path="/customerdash" element={<Customer restaurants= {restaurants} user={user}/>} />
// <Route path="/customerdash/orders" element={<CustomerOrders restaurants= {restaurants} orders={orders}/>} />
// <Route path="/customerdash/profile" element={<CustomerProfile restaurants= {restaurants} orders={orders}/>} />

// <Route path="/customerdash/loyalty points" element={<LoyaltyPoints />} />
// <Route path="/register+your=restaurant" element={<RestaurantSignup />} />
// <Route path="/create+your=account" element={<RegisterForm onLogin={setUser}/>} />
// <Route path="/customerdash/reviews" element={<CustomerReviews restaurants= {restaurants} orders={orders}/>} />
// <Route path="/customerdash/bookings" element={<CustomerBookings restaurants= {restaurants} orders={orders}/>} />
// <Route path="/customerdash/statements" element={<CustomerStatements restaurants= {restaurants} orders={orders}/>} />
// <Route path="/register+your=restaurant/create+restaurant=form" element={<RegisterRestaurant />} />

// <Route path="/admindash" element={<AdminDash/>} />
// <Route path="/admindash/profile" element={<AdminProfile />} />
// <Route path="/create+your=accountadmindash/addfood" element={<AdminAddfood />} />
// <Route path="/admindash/foods" element={<AdminFoods />} />
// <Route path="/admindash/reviews" element={<AdminReviews />} />
// <Route path="/admindash/settlements" element={<AdminSettlements />} />
// <Route path="/admindash/bookings" element={<AdminBookings />} />
// <Route path="/admindash/password/termsandconditions" element={<AdminPassword />} />
// <Route path="/admindash/restaurants" element={<AdminRestaurants/>} />
// <Route path="/blogs/createblog" element={<CreateBlog/>} />
// <Route path="/blogs" element={<BlogPage blogs={blogs}  />} />

//  <Route path="/blogprofile/:id" element={<BlogProfile users={users} />} />

// <Route path="/blog/fullcontent/:id" element={<BlogDetail blogs={blogs}  />} />
// <Route path="/contactus" element={<ContactMe />} />
// <Route path="/restaurantdash" element={<Restaurantdash />} />
// <Route path="/restaurantdash/profile" element={<RestaurantProfile/>} />
// <Route path="/restaurantdash/addfood" element={<RestaurantAddfood />} />
// <Route path="/restaurantdash/foods" element={<RestaurantFoods />} />
// <Route path="/restaurantdash/reviews" element={<RestaurantReviews />} />
// <Route path="/restaurantdash/settlements" element={<RestaurantSettlements />} />
// <Route path="/restaurantdash/bookings" element={<RestaurantBookings />} />
// <Route path="/restaurantdash/password" element={<RestaurantPassword />} />


// <Route path="/restaurants/:id" element={<RestaurantsMenu restaurants= {restaurants} foods={foods} username={user} updateCart={handleUpdateCart}/>} />
// <Route path="/restaurants" element={<Restaurants restaurants={restaurants} />}/>
// <Route path="/me" element={<UserProfile />} />
// </Routes>
// <Footer />
// 	</div>
// 	<div className="modal fade in" id="sign-in" aria-labelledby="myModalLabel">
// 		<div className="modal-dialog">
// 			<div className="login-form">
// 				<div className="modal-content">
// 					<div className="tab-content">
// 						<div id="user-login-tab" className="tab-pane fade in active">
							
// 						{showLogin && showReset ? (
              
//         <>
//           <LoginForm onLogin={setUser} />
//           <ReCAPTCHA/>
// 									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
// 										New Here?
// 										<span    onClick={() => {
//                 setShowReset(false);
//                 setShowLogin(false);
//               }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
// 				textDecoration: 'underline',
// 				color: '#5454ff',
// 				paddingLeft: '5px'
// 			  }} > <Link to="/create+your=account">Sign Up</Link></span><br/>
// 									</div>
	   
// 									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
// 									Forgot your password?
// 										<span    onClick={() => {
//                 setShowReset(true);
//                 setShowLogin(false);
//               }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
// 				textDecoration: 'underline',
// 				color: '#5454ff',
// 				paddingLeft: '5px'
// 			  }}> Reset Password</span>
// 									</div>


//         </>
   

//       ) : showReset && !showLogin ? (
//         <>
//           <ResetForm onLogin={setUser} />
    
// 		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
// 									Have an Account?
// 										<span    onClick={() => {
//                   setShowReset(true);
//                   setShowLogin(true);
//                     }
//                   }
//               data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
// 				textDecoration: 'underline',
// 				color: '#5454ff',
// 				paddingLeft: '5px'
// 			  }}> Login</span>
// 									</div>




//         </>
//       ) : (
//         <>
//           {/* <RegisterForm onLogin={setUser} /> */}
// 		  <div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
// 									Have an Account?
//                   <span    onClick={() => {
//                   setShowReset(true);
//                   setShowLogin(true);
//                     }
//                   }
//               data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch"style={{
// 				textDecoration: 'underline',
// 				color: '#5454ff',
// 				paddingLeft: '5px'
// 			  }}>  Login</span>
// 									</div>
     


// 									<div  style={{ paddingLeft: '27px' }} className="signin-tab-link forget-password">
// 									Forgot your password?
// 										<span    onClick={() => {
//                 setShowReset(true);
//                 setShowLogin(false);
//               }}  data-toggle="tab" className="foodbakery-dev-login-box-btn forgot-switch" style={{
// 				textDecoration: 'underline',
// 				color: '#5454ff',
// 				paddingLeft: '5px'
// 			  }}>  Reset Password</span>
// 									</div>
//         </>
//       )}


// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
//     </>
//   );
// }

// export default App;
