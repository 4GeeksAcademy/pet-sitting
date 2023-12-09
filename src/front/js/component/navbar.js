

import dogwalklogo from '../../img/dogwalklogo.png'
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set the initial state to false
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const handleLogout = async () => {
    try {
      await actions.logout();
      setIsLoggedIn(false); // Set isLoggedIn to false on logout
      navigate("/");
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };
  return (
    <>
      <div className="number-Desk">
        (123)456-7891
        <br></br>
        Hotdoggitydogwalker@gmail.com
      </div>

      <nav className="navbar-Desk navbar-expand-sm bg-body-tertiary">

        <div className="d-flex justify-content-center text-center ">
          <div className="logoTitle-Desk d-flex justify-content-start" >
            <h2 className="title-Desk">Hot Doggity Dog Walkers</h2>
          </div>
        </div>


        <a className="justify-content-start">
          <img className="logoImg-Desk custom-logo" src={dogwalklogo} />
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navItem-Desk collapse navbar-collapse" id="navbarNav d-md-flex">
          <ul className="navbar-nav  d-flex justify-content-center text-center ">
            {!store.token ? (
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link " aria-current="page" style={{ color: 'black' }}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signupUser" className="nav-link " style={{ color: 'black' }}>Sign up</Link>
                </li>
              </>
            ) :
              <>
                <li className="nav-item">
                  <Link to="/" className="nav-link e" aria-current="page" style={{ color: 'black' }}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signupUser" className="nav-link" style={{ color: 'black' }}>Sign up</Link>
                </li>
                <li className="nav-item">
                  <Link to="/account" className="nav-link " style={{ color: 'black' }}>Account</Link>
                </li>
                <li className="nav-item">
                  <Link to="/services" className="nav-link " style={{ color: 'black' }}>Services</Link>
                </li>
                <li className="nav-item">
                  <Link to="/payment" className="nav-link " style={{ color: 'black' }}>Payment</Link>
                </li>
                <li className="nav-item">
                  <Link to="/insurance" className="nav-link  " aria-disabled="true" style={{ color: 'black' }}>Insurance</Link>

                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link " onClick={handleLogout} aria-disabled="true" style={{ color: 'black' }}>Logout</Link>
                </li>
              </>}

            <>
              {/* <li className="nav-item">
              <Link to="/account" className="nav-link" style={{ color: 'black' }}>Account</Link>
            </li>
            <li className="nav-item">
              <Link to="/services" className="nav-link" style={{ color: 'black' }}>Service</Link>
            </li>
            <li className="nav-item">
              <Link to="/payment" className="nav-link" style={{ color: 'black' }}>Payment</Link>
            </li>
            <li className="nav-item">
              <Link to="/insurance" className="nav-link " aria-disabled="true" style={{ color: 'black' }}>Insurance</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleLogout} aria-disabled="true" style={{ color: 'black' }}>Logout</Link> */}
              {/* </li> */}
            </>
          </ul>

        </div>

      </nav >
    </>
  );
};

















