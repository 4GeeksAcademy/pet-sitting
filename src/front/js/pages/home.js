import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { AboutMe } from "./AboutMe";
import { SignupUser } from "./SignupUser";



export const Home = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    console.log("Login button clicked!");
  };

  const handleSignUp = () => {
    console.log("Sign Up button clicked!");
  };

  const handleForgotPassword = () => {

    history.push("/forgot-password");
  }


  return (


    <div className="container-fluid homePage">

      <div className="row homePageText">

        <p> 
Having someone who genuinely cares for your pet while you're away is an invaluable blessing.
 Beyond the peace of mind it provides, it ensures that your furry friend receives the attention, 
 love, and care they deserve. I am a  dedicated caregiver not only do i tend to their basic needs but I also 
 understand the emotional well-being of your pet. This connection is especially crucial when it
  comes to daily walks. Taking your dog on a walk is not just a routine task; it's a commitment 
  to their health and happiness. Dogs, being inherently social creatures, thrive on interaction
   and exercise. A caring walker doesn't just cover physical ground; they explore the world with
    your pet, enriching their senses and contributing to their overall well-being. 
    The bond formed during these outings creates a positive impact on your dog's mental and 
    physical health, ensuring they lead a happy and fulfilling life even when you can't be by their side.</p>
      </div>


      <div className="row homePageMiddleRow ">
        <div className="container d-flex">

          <div className="aboutMePic">
            <img
              src="https://cdn.pixabay.com/photo/2015/03/14/05/37/beagle-672798_1280.jpg"
              className="img-fluid rounded"
              alt="Dog Pic"
            />
            <Link to="/AboutMe" className="btn btn-secondary aboutMeButton">About Me Please Click Here</Link>
          </div>

          <div className="center processBox">
            <h1>Hi, already apart of the family?Welcome back!</h1>

            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Log in
            </button>


            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Log in</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text"></div>
                      </div>
                      <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                      </div>

                      <button type="submit" className="btn btn-primary">Submit</button>
                      <Link to="/forgot-password" className="forgotPasswordLink ms-2">

                      </Link>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

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

            <Link to="/signupUser" className="StartNowText">click here to join the faimly</Link>

          </div>
        </div>
      </div>

      <div className="row">
        <p className="servicesText">
        Sign Up and Join the Family:
Visit my  website and navigate to the "Sign Up" section. Provide your contact information and details about your pet or pets. 
Tell me about their preferences, habits, and any special needs they may have. By joining the Hot Doggity family, you're taking
 the first step towards ensuring your pet receives the best care possible.

Meet and Greet:
Once you've signed up, I'll reach out to you to schedule a convenient day for a meet-and-greet. During this session, I'll have the 
opportunity to personally meet your pet and understand their unique personality. I believe in forming a strong bond with both pet and 
owner, so we'll also discuss your specific requirements and expectations for the care of your furry friend. This initial meeting is crucial 
for us to tailor our services to meet your pet's individual needs.

Schedule Services:
Following the meet-and-greet, you can easily schedule my services through our user-friendly online scheduling system. Choose the days and 
times that best fit your pet's routine, and our professional dog walkers will be there to provide the care, attention, and exercise your pet 
deserves. My online schedule allows for flexibility, making it convenient for you to plan our services around your busy lifestyle.

At Hot Doggity Dog Walkers, I am committed to creating a personalized and stress-free experience for both you and your pet. My goal is to
 ensure that your furry companion receives top-notch care, keeping them happy and healthy while you're away.        </p>
      </div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" >
        <div className=" carouselView carousel-inner">
          <div className="carousel-item active">
            <img src="https://cdn.pixabay.com/photo/2019/12/30/05/30/cockatiel-4728876_1280.jpg" className="d-block w-100" alt="" />
            <div className="carousel-caption position-absolute top-0 start-0">
              <p className=" reviewText overlay-text">
                Kelly deserves a glowing 5-star review!
                Their exceptional care for my birds during my beach trip exceeded my expectations.
                Regular updates and a relaxing return home makes her the top choice for pet sitting.
                Highly recommend this reliable and caring service! ⭐️⭐️⭐️⭐️⭐️</p>
            </div>
          </div>
          <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2018/04/23/14/38/dog-3344414_1280.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption position-absolute top-0 start-0">
              <p className=" reviewText overlay-text">

                Kelly, the dog walker, is a miracle worker!
                She did an incredible job with my usually shy dog,
                making every walk a joyful experience.
                Her patience and expertise deserve a solid 5 stars.
                ⭐️⭐️⭐️⭐️⭐️</p>
            </div>

          </div>
          <div className="carousel-item">
            <img src="https://cdn.pixabay.com/photo/2017/08/02/10/01/people-2570587_1280.jpg" className="d-block w-100" alt="..." />
            <div className="carousel-caption position-absolute top-0 start-0">
              <p className=" reviewText overlay-text">

                Kelly is a lifesaver! While I was on a business trip,
                she took exceptional care of my cat, ensuring timely and nourishing meals.
                Her attention to detail and reliability earn her a well-deserved 5-star rating. ⭐️⭐️⭐️⭐️⭐️

              </p>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
};












