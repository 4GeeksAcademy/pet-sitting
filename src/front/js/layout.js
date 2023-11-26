import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Schedule } from './pages/schedule.js'
import { Insurance } from "./pages/insurance";
import { Services } from "./pages/services"
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { ForgottenPassword } from "./pages/forgottenPassword";
import { SignupUser } from "./pages/SignupUser";
import { AboutMe } from "./pages/AboutMe";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    console.log(process.env.BACKEND_URL)
    // if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<AboutMe />} path="/aboutMe" />
                        <Route element={<ForgottenPassword />} path="/forgotten-password" />
                        <Route element={<Schedule />} path="/schedule/:typeOfSchedule" />
                        <Route element={<SignupUser />} path="/signupUser" />
                        <Route element={<Insurance />} path="/insurance" />
                        <Route element={<Services />} path="/services" />
                        <Route element={<ForgottenPassword />} path="/forgotten-password" />
                        <Route element={<Insurance/>} path="/insurance" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
