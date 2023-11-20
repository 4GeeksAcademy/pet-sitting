import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import {Profile} from "./Profile";
import {AboutMe} from "./AboutMe";



export const Home = () => {
    return (
        <div className="container homePage">
            <div className="row"> 
                 <div className="dogPicTop col-12">
                    <img
                        src="https://cdn.pixabay.com/photo/2016/12/19/21/40/four-dogs-1919152_1280.jpg"
                        className="bannerHomePage img-fluid rounded "
                        alt="Dog Pic"
                    />
                </div>
            </div> 
            <div className="row homePageText">

                <p> THIS IS RANDOM WORDS I WILL FIX TO SAY SOMETHING ...........................</p>
            </div>
            

            <div className="row homePageMiddleRow ">
                <div className="container d-flex">

                    <div className="aboutMePic">
                        <img
                            src="https://cdn.pixabay.com/photo/2015/03/14/05/37/beagle-672798_1280.jpg"
                            className="img-fluid rounded"
                            alt="Dog Pic"
                        />
                        <Link to="/AboutMe" className="aboutMeButton">About Me Please Click Here</Link>
                    </div>

                    <div className="center processBox">
                        <h1>Random text goes here about the process</h1>


                            <button class="button-10" role="button">
                            about my process
                            
                            
                            </button>
                       
                           
                        
                    </div>

                    <div className="starNowPic">
                        <img
                            src="https://cdn.pixabay.com/photo/2023/10/26/15/33/dog-training-8342962_1280.jpg"
                            className="img-fluid rounded"
                            alt="Dog Pic"
                        />
                       
                        <Link to="/profile"className="StartNowText">Ready? Click here to start</Link>
                     
                    </div>
                </div>
            </div>

            <div className="row">
                <p className="servicesText">
                    THIS IS GOING TO BE TEXT ABOUT WHY MY SERVICES ARE GREAT.
                </p>
            </div>
            <div id="carouselExampleFade" class="carousel slide carousel-fade">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://cdn.pixabay.com/photo/2018/04/28/19/05/animals-3358012_1280.jpg" class="d-block w-100" alt="..."/>
      <p> I WILL WRITE A REVIEW HERE </p>
    </div>
    <div class="carousel-item">
      <img src="https://cdn.pixabay.com/photo/2015/07/30/11/05/dog-867238_1280.jpg" class="d-block w-100" alt="..."/>
      <P>I WILL PUT ANOTHTER REVIEW HERE</P>
    </div>
    <div class="carousel-item">
      <img src="https://cdn.pixabay.com/photo/2017/08/02/10/01/people-2570587_1280.jpg" class="d-block w-100" alt="..."/>
      <P>I WILL PUT MORE REVIEWS HERE </P>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        </div>
    );
};





//     const { store, actions } = useContext(Context);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const history = useHistory(); // Initialize the history

//     const handleLogin = () => {
//         console.log("Login button clicked!");
//     };

//     const handleSignUp = () => {
//         console.log("Sign Up button clicked!");
//     };

//     const handleForgotPassword = () => {
//         // Redirect to the forgotten password page
//         history.push("/forgot-password");
//     };

  

//     return (
//         <div>
//             <div className="container loginBox mt-5">
//                 <h2>Login</h2>
//                 <div className="homeView">
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputEmail1" className="form-label">
//                             Email address
//                         </label>
//                         <input
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                             type="email"
//                             name="emailInput"
//                             className="form-control"
//                             id="exampleInputEmail1"
//                             aria-describedby="emailHelp"
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="exampleInputPassword1" className="form-label">
//                             Password
//                         </label>
//                         <input
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                             type="password"
//                             name="passwordInput"
//                             className="form-control"
//                             id="exampleInputPassword1"
//                         />
//                     </div>
//                     <div className="button-container">
//                         <button onClick={handleLogin} type="submit" className="submitButton btn btn-primary">
//                             Submit
//                         </button>

//                         <Link to="/signupUser" className="btn btn-secondary ms-2">
//                             Sign Up
//                         </Link>

//                         <Link to="/forgot-password" className="forgotPasswordLink ms-2">
//                             Forgot Password?
//                         </Link>
//                     </div>
//                 </div>
//             </div>

//             {/* <div className=" bioImg container mt-5">
//                 <img
//                     src="https://cdn.pixabay.com/photo/2015/08/17/11/33/woman-892309_1280.jpg"
//                     className="img-fluid rounded"
//                     alt="Bio Pic"
//                 />
//             </div> */}

//             <div className="container mt-5 aboutMeContainer">
          
//                 <img
//                     src="https://cdn.pixabay.com/photo/2015/08/17/11/33/woman-892309_1280.jpg"
//                     className="img-fluid rounded"
//                     alt="Bio Pic"
//                 />
            
//                 <h1>About Me</h1>
//                 <p>
//                     Hey there! I'm Kelly Johnson, your friendly neighborhood dog walker and pet sitter. Growing up surrounded
//                     by pets, I've turned my love for animals into a full-time gig. With a degree in Animal Behavior Science,
//                     I've got a knack for understanding what our furry friends need. I pride myself on personalized care,
//                     whether it's a morning stroll or a cozy night in. Beyond the leash, you'll find me organizing local dog
//                     playdates and volunteering at the animal shelter. I'm not just a pet sitter; I'm a genuine friend to
//                     every pet I meet. Let's make some pawsitive memories together! 🐾
//                 </p>
//             </div>
//         </div>
//     );
// };
