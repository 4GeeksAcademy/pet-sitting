import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from '../../styles/services.css'
import dogwalkingpic from '/workspaces/pet-sitting/src/front/img/dogwalkingpic.jpg'
import petcheckinpic from '/workspaces/pet-sitting/src/front/img/petcheckinpic.jpg'
import meetandgreet from '/workspaces/pet-sitting/src/front/img/meetandgreet.jpg'
import petsittingpic from '/workspaces/pet-sitting/src/front/img/petsittingpic.jpg'

export const Services = () => {
  useEffect(() => {
    document.body.className = "services"

    return function cleanup() {
      document.body.classList.remove('services')
    }
  }, [])
  return (
    <div className="container-fluid mx-auto services">
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
            <Link to="/schedule/dog-walk" style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-border">
                  <div className="card-content">
                    <div className="card-image">
                      <img src={dogwalkingpic} />
                    </div>
                    <div className="card-info-wrapper">
                      <div className="card-info">
                        <div className="card-info-title text-center">
                          <h3>Schedule a Dog Walk</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/schedule/pet-check-in" style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-border">
                  <div className="card-content">
                    <div className="card-image">
                      <img src={petcheckinpic} />
                    </div>
                    <div className="card-info-wrapper">
                      <div className="card-info">
                        <div className="card-info-title text-center">
                          <h3>Schedule a Pet Check In</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/schedule/meeting" style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-border">
                  <div className="card-content">
                    <div className="card-image">
                      <img src={meetandgreet} />
                    </div>
                    <div className="card-info-wrapper">
                      <div className="card-info">
                        <div className="card-info-title text-center">
                          <h3>Schedule a Meeting</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className="col-6">
            <Link to="/schedule/pet-sitting" style={{ textDecoration: 'none' }}>
              <div className="card">
                <div className="card-border">
                  <div className="card-content">
                    <div className="card-image">
                      <img src={petsittingpic} />
                    </div>
                    <div className="card-info-wrapper">
                      <div className="card-info">
                        <div className="card-info-title text-center">
                          <h3>Schedule a Pet Sitting</h3>
                        </div>
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
