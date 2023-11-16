import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const { actions } = useContext(Context);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petName: "",
    petBreed: "",
    petAge: "",
    comments: "",
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
        petName: "",
        petBreed: "",
        petAge: "",
        comments: "",
      });
    }
  };

  return (
    <div className="urlBackgroundSignup">
      <div className="signupPage">
        <h2>Sign Up</h2>
        <div>
          <div className="mb-3">
            <label htmlFor="petName">Pet Name</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="petBreed">Pet Breed</label>
            <input
              type="text"
              id="petBreed"
              name="petBreed"
              value={formData.petBreed}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="petAge">Pet Age</label>
            <input
              type="text"
              id="petAge"
              name="petAge"
              value={formData.petAge}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="comments">Tell us about your furbaby</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
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
