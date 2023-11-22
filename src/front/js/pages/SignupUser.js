import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export const SignupUser = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", 
    first_name: "",
    last_name: "",
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
    let result = await actions.signup(formData);

    if (result) {
      navigate("/login");
      setFormData({
        email: "",
        password: "",
        confirmPassword: "", // Clear confirmPassword on successful submit
      
      });
    }
  };
 
  return (
    <div className=" signupPage urlBackgroundSignup">
      <div className="signupPage">
        <h2>Sign Up</h2>
        <div className="signupBox">
        <label htmlFor="email">First name</label>
          <input
            type="first_name"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
           <label htmlFor="last_name">last name</label>
          <input
            type="last_name"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="confirm_password"
            id="confirmPassword"
            name="confirm_Password"
            value={formData.confirm_Password}
            onChange={handleChange}
            required
          />

         

       
          
        

          <div className="signupSubmitButton" >
            <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
