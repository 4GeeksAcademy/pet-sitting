import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = "/home";
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        > Login</button>
        <ul className="dropdown-menu">
          <li>
            <a className="dropdown-item" href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
          <li>
            <Link to="/login">
              <a className="dropdown-item" href="#">
                Login
              </a>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <a className="dropdown-item" href="#">
                Signup
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};










// import { Link } from "react-router-dom";

// export const Navbar = () => {
// 	return (
// 		<nav className="navbar navbar-light bg-light">
// 		<div class="dropdown">
//   <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//     Login
//   </button>
//   <ul class="dropdown-menu">
//     <li><Link to="/login"><a class="dropdown-item" href="#">Login</a></Link></li>
//     <li><Link to="/signup"><a class="dropdown-item" href="#">Signup</a></Link></li>
//     <li><a class="dropdown-item" href="#">Logout</a></li>
//   </ul>
// </div>
// 		</nav>
// 	);
// };
