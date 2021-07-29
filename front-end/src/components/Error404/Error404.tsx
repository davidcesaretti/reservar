import React from "react";
<<<<<<< HEAD
import NavBar from "../Nav/Nav2";
import './Error.css'
import { Link } from "react-router-dom";


const Error404 = () => {
    return (
        <div>
            <NavBar />
            <h1>404 Error Page Not Found</h1>
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
=======
import style from "./Error404.module.css";

const Error404 = () => {
  return (
    <div className={style.container404}>
      <h2 className={style.titleError}>ERROR 404</h2>
      <h3 className={style.str404}>UPS! That’s an error</h3>
    </div>
  );
>>>>>>> main
};

export default Error404;
