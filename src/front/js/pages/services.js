import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../styles/services.css'
import dogwalkingpic from '/workspaces/pet-sitting/src/front/img/dogwalkingpic.jpg'
import petcheckinpic from '/workspaces/pet-sitting/src/front/img/petcheckinpic.jpg'
import meetandgreet from '/workspaces/pet-sitting/src/front/img/meetandgreet.jpg'
import petsittingpic from '/workspaces/pet-sitting/src/front/img/petsittingpic.jpg'


export const Services = () => {
  return (
    <div className="container-fluid mx-auto">
      <div className="mx-auto" id="cards" onMouseMove={(e) => {
        for (const card of document.getElementsByClassName("card")) {
          const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        }
      }}>
        <div className="row d-flex w-100 mx-auto">
          <div className="col-6">
            <Link to="/schedule/dog-walk">
              <div class="card">
                <div class="card-content">
                  <div class="card-image">
                    <img src={dogwalkingpic} />
                  </div>
                  <div class="card-info-wrapper">
                    <div class="card-info">
                      <i class="fa-duotone fa-apartment"></i>
                      <div class="card-info-title">
                        <h3>Schedule a Dog Walk</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/schedule/pet-check-in">
              <div class="card">
                <div class="card-content">
                  <div class="card-image">
                    <img src={petcheckinpic} />
                  </div>
                  <div class="card-info-wrapper">
                    <div class="card-info">
                      <i class="fa-duotone fa-unicorn"></i>
                      <div class="card-info-title">
                        <h3>Schedule a Pet Check In</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/schedule/meeting">
              <div class="card">
                <div class="card-content">
                  <div class="card-image">
                    <img src={meetandgreet} />
                  </div>
                  <div class="card-info-wrapper">
                    <div class="card-info">
                      <div class="card-info-title">
                        <h3>Schedule a Meet and Greet</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/schedule/pet-sitting">
              <div class="card">
                <div class="card-content">
                  <div class="card-image">
                    <img src={petsittingpic} />
                  </div>
                  <div class="card-info-wrapper">
                    <div class="card-info">
                      <i class="fa-duotone fa-person-to-portal"></i>
                      <div class="card-info-title">
                        <h3>Schedule a Pet Sitting</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

}
