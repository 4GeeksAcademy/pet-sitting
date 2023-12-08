import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Home = () => {
  const { actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        console.error("Please enter both email and password.");
        return;
      }

      const loginSuccess = await actions.login(email, password);
      if (loginSuccess) {
        console.log("Login successful");
        setShowModal(false); // Close the login modal
        navigate("/");
      } else {
        console.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  let greeting;

  if (sessionStorage.getItem("token")) {
    greeting = <h1>Welcome back!</h1>;
  } else {
    greeting = <h1>Hi, already a part of the family? Welcome back!</h1>;
  }

  return (
    <div className="container-fluid homePage">
      <div className="row homePageText">
        <h4 className="col-auto">
          Having a dedicated pet caregiver provides priceless peace of mind,
          ensuring your furry friend gets the attention and care they need. As a
          committed caregiver, I address both basic needs and understand their
          emotional well-being. Daily walks are a vital commitment to your dog's
          health and happiness, fostering both interaction and exercise. This
          bond positively impacts their mental and physical well-being, ensuring
          a fulfilling life in your absence.
        </h4>
      </div>

      <div className="row homePageMiddleRow ">
        <div className="container d-flex">
          <div className="aboutMePic" style={{ position: 'relative' }}>
            <img
              src="https://cdn.pixabay.com/photo/2015/03/14/05/37/beagle-672798_1280.jpg"
              className="img-fluid rounded"
              alt="Dog Pic"
            />
            <Link to="/AboutMe" className="btn btn-secondary aboutMeButton">About Me Please Click Here</Link>
          </div>

          <div className="center processBox">
            {greeting}
            {!sessionStorage.getItem("token") && (
              <button
                type="button"
                className="btn btn-secondary loginButton"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Log in
              </button>
            )}

            <div
              className="modal fade"
              id="loginModal"
              tabIndex="-1"
              aria-labelledby="loginModalLabel"
              aria-hidden="true"
              style={{ display: showModal ? "block" : "none" }}
              onClick={() => setShowModal(false)}
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>

                      <div
                        className={`modal fade ${showModal ? 'show' : ''}`}
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                        style={{ display: showModal ? 'block' : 'none' }}
                        onClick={() => setShowModal(false)}
                      ></div>
                    </div>
                  </div>
                  <div className="modal-footer d-flex justify-content-center align-items-center">
                    <button
                      type="button"
                      className="btn btn-secondary loginButton"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={handleLogin}
                    >
                      Submit
                    </button>
                    <Link
                      to="/forgotten-password"
                      className="forgotPasswordLink ms-2"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="starNowPic">
            <img
              src="https://cdn.pixabay.com/photo/2023/10/26/15/33/dog-training-8342962_1280.jpg"
              className="img-fluid rounded"
              alt="Dog Pic"
            />
            <Link to="/signupUser" className=" btn btn-secondary StartNowText">Click here to join the family</Link>
          </div>
        </div>
      </div>

      <br />

      <h4 className="row servicesText">
        <ul>
          <li>Visit our website and sign up for Hot Doggity dog walking services.</li>
          <br />
          <li>Share your contact information and details about your pet, including preferences, habits, and any special needs.</li>
          <br />
          <li>After signing up, we'll schedule a meet-and-greet to personally connect with your pet, understand their unique personality, and discuss your specific requirements.</li>
          <br />
          <li>Once the meet-and-greet is complete, easily schedule services through our user-friendly online system.</li>
          <br />
          <li>Choose days and times that suit your pet's routine, and our professional dog walkers will provide the care, attention, and exercise your pet deserves.</li>
        </ul>
        At Hot Doggity Dog Walkers, we're dedicated to creating a personalized, stress-free experience for both you and your pet. Our goal is to ensure your furry companion stays happy and healthy while you're away.
      </h4>
      <br />
    </div>
  );
};
