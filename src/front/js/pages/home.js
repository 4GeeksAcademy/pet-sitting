import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        console.log("Login button clicked!");
    };

    const handleSignUp = () => {
        console.log("Sign Up button clicked!");
    };

    return (
        <div>
            <div className="loginBox">
                <h2>Login</h2>
                <div className="homeView">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Email address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            name="emailInput"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            name="passwordInput"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="button-container">
                        <button onClick={handleLogin} type="submit" className="submitButton btn btn-primary">
                            Submit
                        </button>

                        <Link to="/signupUser" className="btn btn-secondary ms-2">
                            Sign Up
                        </Link>

                        <Link to="/forgotten-password" className="forgotPasswordLink ms-2">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bioPic container">
                <div className="container">
                    <img
                        src="https://cdn.pixabay.com/photo/2015/08/17/11/33/woman-892309_1280.jpg"
                        className="img-fluid"
                    />
                </div>
            </div>

            <div className="aboutMeContainer">
                <div className="container">
                    <h1>About Me</h1>
                    <p>Hey there! I'm Kelly Johnson, your friendly neighborhood dog walker and pet sitter. Growing up surrounded by pets,
                        I've turned my love for animals into a full-time gig.
                        With a degree in Animal Behavior Science, I've got a knack for understanding what our furry friends need.
                        I pride myself on personalized care, whether it's a morning stroll or a cozy night in.
                        Beyond the leash, you'll find me organizing local dog playdates and volunteering at the animal shelter.
                        I'm not just a pet sitter; I'm a genuine friend to every pet I meet. Let's make some pawsitive memories together!
                        🐾</p>
                </div>
            </div>
        </div>
    );
};
