import React, { useEffect, useState } from 'react';
import CustomerSidebar from './customersidebar';
import Home from './Home';
import CustomerHeader from './CustomerHeader';

function LoyaltyPoints({ yummypoints }) {
  const [userr, setUserr] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user information
    fetch("/me")
      .then((response) => response.json())
      .then((userr) => setUserr(userr))
      .catch((error) => {
        setError("Error fetching user data.");
        console.error("Error fetching user data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const userPoints = yummypoints.find((yummypoint) => yummypoint.id === userr.id);

  // Log the userr.id and userPoints to the console
  useEffect(() => {
    console.log(userr.id);
    console.log(userPoints);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {userr && (
        <div className="main-section">
          {/* user header */}
          <CustomerHeader userr={userr} />

          <div className="page-section account-header buyer-logged-in">
            <div className="container">
              <div className="row">
                {/* user sidebar */}
                <CustomerSidebar />

                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="user-dashboard">
                    <div className="user-holder">
                      <div className="element-title has-border right-filters-row">
                        <h5>Yummy Points</h5>
                        <div className="right-filters row pull-right">
                          {/* Filters and date range selection */}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="order-list" style={{ height: "272px" }}>
                          <div className="author-info">
                            <div className="img-holder">
                              <figure>
                                <a href="#">
                                  <img
                                    src="assets/extra-images/coin.png" // Replace with the correct image source
                                    alt="Coin Icon"
                                  />
                                </a>
                              </figure>
                            </div>
                            <div className="text-holder">
                              <h6>Loyalty Points</h6>
                              <address>
                                Total Points: {userPoints}
                              </address>
                            </div>
                          </div>
                          <div className="post-time">
                            <span>
                              Last Updated: {userr.loyaltyPointsLastUpdated}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="pagination">
                      <li className="active">
                        <a>1</a>
                      </li>
                      <li>
                        <a href="#">2</a>
                      </li>
                      <li>
                        <a href="#">3</a>
                      </li>
                      <li>
                        <span className="page-numbers dots">…</span>
                      </li>
                      <li>
                        <a href="#">24</a>
                      </li>
                      <li>
                        <a href="#">Next </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoyaltyPoints;

// import React, { useEffect, useState } from 'react';
// import CustomerSidebar from './customersidebar';
// import Home from './Home';
// import CustomerHeader from './CustomerHeader';

// function LoyaltyPoints() {
//   const [user, setUser] = useState(null);
//   const [loyaltyPoints, setLoyaltyPoints] = useState(null);
//   const [userr, setUserr] = useState(null);
//   useEffect(() => {
//     // Fetch user information
//     fetch("/me")
//       .then((response) => response.json())
//       .then((user) => setUser(user))
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, []);


 

// 	useEffect(() => {
// 	  // Fetch user information
// 	  fetch("/me")
// 		.then((response) => response.json())
// 		.then((user) => setUserr(userr));
// 	}, []);



//   useEffect(() => {
//     // Fetch user's loyalty points when user changes
//     if (user) {
//       fetch(`/yummypoints/${user.id}`) // Replace with the correct API endpoint
//         .then((response) => response.json())
//         .then((yummypoints) => setLoyaltyPoints(yummypoints))
//         .catch((error) => {
//           console.error("Error fetching loyalty points:", error);
//         });
//     }
//   }, [user]);


//   return (
//     <div className="main-section">
//       {/* User header */}
//       <CustomerHeader userr={userr} />

//       <div className="page-section account-header buyer-logged-in">
//         <div className="container">
//           <div className="row">
//             {/* User sidebar */}
//             <CustomerSidebar />

//             <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
//               <div className="user-dashboard">
//                 <div className="user-holder">
//                   <div className="element-title has-border right-filters-row">
//                     <h5>Yummy Points</h5>
//                     <div className="right-filters row pull-right">
//                       {/* Filters and date range selection */}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                     <div className="order-list" style={{ height: "272px" }}>
//                       <div className="author-info">
//                         <div className="img-holder">
//                           <figure>
//                             <a href="#">
//                               <img
//                                 src="assets/extra-images/coin.png" // Replace with the correct image source
//                                 alt="Coin Icon"
//                               />
//                             </a>
//                           </figure>
//                         </div>
//                         <div className="text-holder">
//                           <h6>Loyalty Points</h6>
//                           <address>
//                             Total Points: {loyaltyPoints?.totalPoints || 0}
//                           </address>
//                         </div>
//                       </div>
//                       <div className="post-time">
//                         <span>
//                           Last Updated: {loyaltyPoints?.lastUpdated || "N/A"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <ul className="pagination">
//                   <li className="active">
//                     <a>1</a>
//                   </li>
//                   <li>
//                     <a href="#">2</a>
//                   </li>
//                   <li>
//                     <a href="#">3</a>
//                   </li>
//                   <li>
//                     <span className="page-numbers dots">…</span>
//                   </li>
//                   <li>
//                     <a href="#">24</a>
//                   </li>
//                   <li>
//                     <a href="#">Next </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoyaltyPoints;
