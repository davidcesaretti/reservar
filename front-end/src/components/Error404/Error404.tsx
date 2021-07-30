import React from "react";
import NavBar from "../Nav/Nav2";
import './Error.css'
import { Link } from "react-router-dom";


const Error404 = () => {
    return (
        <div className="body-error">
            <NavBar />
            <h1 className="h1-error">404 Error Page Not Found</h1>
            <p className="zoom-area">
                <b>UPS!</b> That’s an error{" "}
            </p>
            <section className="error-container">
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
                <span className="zero">
                    <span className="screen-reader-text">0</span>
                </span>
                <span className="four">
                    <span className="screen-reader-text">4</span>
                </span>
            </section>
            <div className="link-container">
                <Link 
                    to={"/"}
                    className="more-link"
                >
                    Return Home Page
                </Link>
            </div>
        </div>
    );
};

export default Error404;
