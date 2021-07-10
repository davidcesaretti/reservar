import React from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";

const Register = () => {
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <div>
      <h1>Te damos la bienvenida a Reservar</h1>
      <h2>Crea una cuenta</h2>
      <input placeholder="Escribe tu correo electrónico" />
      <input placeholder="Escribe una contraseña" />
      <div>
        <button>Soy Viajero</button>
        <button>Soy Host</button>
      </div>
      <button>Registrarme</button>
      <div>
        <GoogleLogin
          clientId="283885012153-bsj812gn457gvnqnoq6u1p2oup9t1304.apps.googleusercontent.com"
          buttonText="Iniciar Sesión con Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="516762732768499"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          textButton="Iniciar sesión"
          icon="fa-facebook"
        />
      </div>
      <span>
        Ya tienes una cuenta? Ingresa <Link to="/login">AQUI</Link>
      </span>
    </div>
  );
};

export default Register;
