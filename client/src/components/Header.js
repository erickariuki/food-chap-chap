import { NavLink } from "react-router-dom";
import "../components/css/Header.css";

function Header({ user, onLogout }) {
  function handleLogout() {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }
  let location = process.env.PUBLIC_URL;

  if (user && user.user_type) {
    if (user.user_type === "customer") {
      location = `${process.env.PUBLIC_URL}/customerdash`;
    } else if (user.user_type === "restaurant_owner") {
      location = `${process.env.PUBLIC_URL}/restaurantdash`;
    } else if (user.user_type === "admin") {
      location = `${process.env.PUBLIC_URL}/admindash`;
    }
  }

  return (
    <nav className="nav-wrapper">
      <div className="nav-left">
        <ul className="nav-left__ul">
          <li className="nav-left__li">
            <NavLink className="trans" to={`${process.env.PUBLIC_URL}`}>
              Home
            </NavLink>
          </li>

          <li className="nav-left__li">
            <NavLink
              className="trans"
              to={`${process.env.PUBLIC_URL}/restaurants`}
            >
              Restaurants
            </NavLink>
          </li>

          <li className="nav-left__li">
            <a href="/blogs">Blogs</a>
          </li>
        </ul>
      </div>
      <div className="logo"></div>
      <div className="nav-right">
        <>
          <ul>
            <li>
              <a href="/contactus">Contact Us</a>
            </li>

            {user ? (
              <div className="nav--buttons">
                <li>
                  <NavLink to={`${location}`}>
                    {user.username}: {user.user_type}
                  </NavLink>
                </li>

                <li>
                  <button
                    href="/logout"
                    className="nav-button"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </div>
            ) : (
              <div className="nav--buttons">
                <li>
                  <button
                    className="nav-button"
                    data-target="#sign-in"
                    data-toggle="modal"
                    href="#user-register"
                  >
                    Login / Register
                  </button>
                </li>
                <li>
                  <button
                    className="nav-button"
                    data-target="#sign-in"
                    data-toggle="modal"
                    href="register+your=restaurant"
                  >
                    Register Restaurant
                  </button>
                </li>
              </div>
            )}
          </ul>
        </>
      </div>
    </nav>
  );
}

export default Header;
