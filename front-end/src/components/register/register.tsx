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
      <h1>Welcome to RentMe</h1>
      <h2>Create your account</h2>
      <input placeholder="Email" />
      <input placeholder="Password" />
      <div>
        <button>I'm a Guest</button>
        <button>I'm a Host</button>
      </div>
      <button>Sign up</button>
      <div>
        <GoogleLogin
          clientId="283885012153-bsj812gn457gvnqnoq6u1p2oup9t1304.apps.googleusercontent.com"
          buttonText="With Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="516762732768499"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          textButton="With facebook"
          icon="fa-facebook"
        />
      </div>
      <span>
        Already have an account? Sign in! <Link to="/login">HERE</Link>
      </span>
    </div>
  );
};

export default Register;
