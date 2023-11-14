import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";
import { Calendar } from '../component/calendar.js'
import { Timeslots } from '../component/timeslots.js'

export const Schedule = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid">
            <div className="row flex-nowrap schedule-row gx-0">
                <div className="col-lg-1 px-0 bg-dark d-none d-md-flex">
                    <div className="d-flex flex-column align-items-sm-center pt-2 text-light min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none px-3">
                            <span className="fs-5 d-none d-sm-inline">Home</span>
                        </a>
                        <div className="nav nav-tabs flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="nav-tab" role="tablist">
                            <button className={`nav-link ${store.activeScheduleTab === 'nav-timeslots' ? 'active' : ''}`} id="nav-timeslots-tab" type="button" role="tab" aria-controls="nav-timeslots" aria-selected="true" onClick={() => actions.changeActiveScheduleTab('nav-timeslots')}>
                                <i className="fa-solid fa-table-cells"></i> <span className="ms-1 d-none d-sm-inline">Weekly Timeslots</span>
                            </button>
                            <button className={`nav-link ${store.activeScheduleTab === 'nav-calendar' ? 'active' : ''}`} id="nav-calendar-tab" type="button" role="tab" aria-controls="nav-monthly-calendar" aria-selected="false" onClick={() => actions.changeActiveScheduleTab('nav-calendar')}>
                                <i className="fa-regular fa-calendar-days"></i> <span className="ms-1 d-none d-sm-inline">Monthly Calendar</span> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-2">
                    <nav className="navbar bg-dark d-md-none">
                        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleContent" aria-controls="navbarToggleContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i class="fa-solid fa-bars"></i>
                        </button>
                        <div className="collapse" id="navbarToggleContent">
                            <div className="bg-dark">
                                <button className={`nav-link bg-dark ${store.activeScheduleTab === 'nav-timeslots' ? 'active' : ''}`} id="nav-timeslots-tab" type="button" role="tab" aria-controls="nav-timeslots" aria-selected="true" onClick={() => actions.changeActiveScheduleTab('nav-timeslots')}>
                                    <i className="fa-solid fa-table-cells"></i>
                                </button>
                                <button className={`nav-link bg-dark ${store.activeScheduleTab === 'nav-calendar' ? 'active' : ''}`} id="nav-calendar-tab" type="button" role="tab" aria-controls="nav-monthly-calendar" aria-selected="false" onClick={() => actions.changeActiveScheduleTab('nav-calendar')}>
                                    <i className="fa-regular fa-calendar-days"></i>
                                </button>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="col">
                    <div className="tab-content" id="nav-tabContent">
                        <div className={`tab-pane fade ${store.activeScheduleTab === 'nav-timeslots' ? 'show active' : ''}`} id="nav-timeslots" role="tabpanel" aria-labelledby="nav-timeslots-tab"><Timeslots /></div>
                        <div className={`tab-pane fade ${store.activeScheduleTab === 'nav-calendar' ? 'show active' : ''}`} id="nav-calendar" role="tabpanel" aria-labelledby="nav-calendar-tab"><Calendar /></div>
                    </div>
                </div>
            </div>
        </div>
	);
};
