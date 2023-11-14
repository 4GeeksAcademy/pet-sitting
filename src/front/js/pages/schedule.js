import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { Calendar } from '../component/calendar.js'
import { Timeslots } from '../component/timeslots.js'

export const Schedule = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-xs-2 col-lg-1 px-0 bg-dark side-bar">
                    <div className="d-flex flex-column align-items-sm-center pt-2 text-light min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none px-3">
                            <span className="fs-5 d-none d-sm-inline">Home</span>
                        </a>
                        <div className="nav nav-tabs flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-timeslots-tab" data-bs-toggle="tab" data-bs-target="#nav-timeslots" type="button" role="tab" aria-controls="nav-timeslots" aria-selected="true">
                                <i className="fa-solid fa-table-cells"></i> <span className="ms-1 d-none d-sm-inline">Weekly Timeslots</span>
                            </button>
                            <button className="nav-link" id="nav-calendar-tab" data-bs-toggle="tab" data-bs-target="#nav-calendar" type="button" role="tab" aria-controls="nav-monthly-calendar" aria-selected="false">
                                <i className="fa-regular fa-calendar-days"></i> <span className="ms-1 d-none d-sm-inline">Monthly Calendar</span> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col py-3">
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-timeslots" role="tabpanel" aria-labelledby="nav-timeslots-tab"><Timeslots /></div>
                        <div className="tab-pane fade" id="nav-calendar" role="tabpanel" aria-labelledby="nav-calendar-tab"><Calendar /></div>
                    </div>
                </div>
        </div>
    </div>
	);
};
