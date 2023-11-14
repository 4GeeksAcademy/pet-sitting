import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const handleLogout = () => {
    setIsLoggedIn(false);

    window.location.href = "/home";
  };

  return (
  <nav className="navbar navbar-light" style={{ backgroundColor: 'beige' }}>
      <div className="container">
        <Link to="/" className="navbar-brand">
        <img className="logoImg" src="https://t4.ftcdn.net/jpg/01/26/17/71/240_F_126177158_X32G1wOL21G4Cu2Yp8CQ2CrvWq9aEy0c.jpg" alt="Logo" height="30" />
        </Link>

        <h1 className="navbar-title">Hot Doggity Dog Walkers</h1>

       
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Logout
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Services
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Payments
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Pet Documents
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#" onClick={handleLogout}>
                Service History
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};