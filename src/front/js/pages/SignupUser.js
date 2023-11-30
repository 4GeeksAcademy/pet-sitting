import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
export const SignupUser = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async () => {
    const requiredFields = ["email", "password", "first_name", "last_name"];
    if (formData.password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    let result = await actions.signup(formData);
    if (result) {
      const destination = result ? "/" : "/signup";
      navigate(destination);
      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
      });
      setConfirmPassword(""); // Clear confirm password after submission
    }
  };
  return (
    <div className="signupPage urlBackgroundSignup">
      <img
        src="https://t4.ftcdn.net/jpg/06/10/13/27/240_F_610132710_9M0fM6ggD6Z38yfNdPWQ9w3j6uCOZ54y.jpg"
        alt="Banner Image"
        className="bannerImage"
      />
      <div className="signupPage">
        <div className="beigeBox">
          <h2>Sign Up</h2>
          <div className="signupBox">
            {/* ... other input fields ... */}
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="signupSubmitButton">
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-primary signupButton"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
