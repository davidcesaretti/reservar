import React from "react";
import "./MenuAdmin.css";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../firebase/index";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import logo from "../../Image/trekker.svg";

function MenuAdmin() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();

  const logOut = () => {
    auth.signout();
    history.push("/");
  };
  return (
    
      
    <div className="contenedor-adminMenu">
      <div className="div-parrafo">
        <Link to="/">
      <img src={logo} 
      alt="trekker logo"
      width="150"
      height="60"/>
        </Link>
        
      </div>
      <div className="div-parrafo">
        <Link to="/homeAdminTabla">
        <p>Registered User</p>
        </Link>
        <div className="separador-adminMenu"></div>
      </div>
      <div className="div-parrafo">
        <Link to="/tablalodging">
        <p>Registered Lodgings</p>
        </Link>
        <div className="separador-adminMenu"></div>
      </div>
      <div className="div-parrafo">
        <p>Earnings</p>
        <div className="separador-adminMenu"></div>
      </div>

      <div className="div-parrafo">
        <p>Terms & Conditions</p>
        <div className="separador-adminMenu"></div>
      </div>
      <div className="div-parrafo">
        <p>FAQ</p>
        <div className="separador-adminMenu"></div>
      </div>
      <div className="div-parrafo">
        <p>Privacy Policy</p>
        <div className="separador-adminMenu"></div>
      </div>
      <div className="position-botonAdmin">
        <button onClick={() => logOut()} className="botonAdmin-menu">
          SIGN OUT
        </button>
      </div>
    </div>
  
  );
}

export default MenuAdmin;
