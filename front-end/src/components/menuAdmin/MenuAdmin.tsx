import React from "react";
import "./MenuAdmin.css";
import { useHistory, Link } from "react-router-dom";
import { useAuth } from "../../firebase/index";
import { useDispatch, useSelector } from "react-redux";

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
        <Link className="links-menuAdmin" to="/homeAdminTabla"><p>Registered User</p></Link>
        <div className="separador-adminMenu"></div>
      </div>
      {/* <div className="div-parrafo">
        <p>Registered Lodgings</p>
        <div className="separador-adminMenu"></div>
      </div> */}
      <div className="div-parrafo">
      <Link className="links-menuAdmin"  to="/earnings"><p>Earnings</p></Link>
        <div className="separador-adminMenu"></div>
      </div>

      <div className="div-parrafo">
      {/* <Link className="links-menuAdmin"  to="/terms"> */}<p>Terms & Conditions</p>{/* </Link> */}
        <div className="separador-adminMenu"></div>
      </div>
      <div className="div-parrafo">
      {/* <Link className="links-menuAdmin"  to="/FAQ"> */}<p>FAQ</p>{/* </Link> */}
        <div className="separador-adminMenu"></div>
      </div>
      <div className="div-parrafo">
      {/* <Link className="links-menuAdmin" to="/privacy"> */}<p>Privacy Policy</p>{/* </Link> */}
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
