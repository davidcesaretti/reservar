import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../firebase/index";
import "./AdminDashboard.css";
import RegisteredUsers from "../RegisteredUsers/RegisteredUsers";
import RegisteredLodgings from "../RegisteredLodgings/RegisteredLodgings";
import Reviews from "../Reviews/Reviews";
import FAQ from "../FAQ/FAQ";
import TermsAndConditions from "../TermsAndConditions/TermsAndConditions";
import Earnings from "../Earnings/Earnings";
import Stats from "../Stats/Stats";
import GeneralBalance from "../GeneralBalance/GeneralBalance";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import logo from "../../Image/trekker.svg";
import MenuAdmin from "../menuAdmin/MenuAdmin";
import { AnyAaaaRecord } from "dns";

const AdminDashboard = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const [section, setSection] = useState("");
  const booleanState = useSelector((state:any) => state.booleanState)

  const handleClick = (e) => {
    setSection(e.target.name);
  };

  const logOut = () => {
    auth.signout();
    history.push("/");
  };

  return (
    <div className="con-homeAdmin">
      <div style={{ width: "100%" }}>
        <MenuAdmin></MenuAdmin>
      </div>
      <div className="contenido-homeAdmin">
        <div className="contenido-welcome">
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>Welcome back!</p>
          <h1 style={{ fontSize: "36px", fontWeight: "bold" }}>ADMIN PANEL</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
