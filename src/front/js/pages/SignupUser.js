import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SignupPets } from "./SignupPets";

export const SignupUser = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_Number: "",

  });

  const [addPetForm, setAddPetForm] = useState(false);

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
      navigate("/");
      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        address: "",
        phone_Number: "",
      });
    }
  };

  return (
    <div className="urlBackgroundSignup">
      <div className="signupPage">
        <h2>Sign Up</h2>
        <div className="signupBox">

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


          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />


          <label htmlFor="last_name">Last Name</label>
          <input
            type="last_name"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />


          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phone_number}
            onChange={handleChange}
            required
          />

          <div className="signupSubmitButton" >

            <button type="submit" onClick={() => handleSubmit()} className="btn btn-primary">
              Submit
            </button>
          </div>

          <div className="addPetButton">


            {addPetForm ? (

              <SignupPets close={() => setAddPetForm(false)} />
            ) : (

              <button onClick={() => setAddPetForm(true)}>Add pet</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
