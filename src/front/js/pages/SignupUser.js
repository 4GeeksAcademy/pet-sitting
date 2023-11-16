import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    address: "", 
    phoneNumber: "", 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {

    let result = await actions.signup(formData)

    if (result) {
      navigate("/login")
      setFormData({
        email: "",
        password: "",
        address: "", 
        phoneNumber: "", 
      });
    }
  }

  return (
    <div className="urlBackgroundSignup">
      <div className="signupPage">
        <h2>Sign Up</h2>
        <div >
          <div className="emailBox">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
        
          <div className="mb-3">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary">
            Submit
          </button>

        </div>
      </div>
    </div>
  );
};
