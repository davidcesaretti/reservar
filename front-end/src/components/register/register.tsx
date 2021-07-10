import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { GoogleLogin } from 'react-google-login'
import { FacebookLogin } from 'react-facebook-login';
import {Link} from 'react-router-dom'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'


const Register = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyBh2wY42foyI4uwoW9wfIKtCz2ie-mXELw",
            authDomain: "reservar-319305.firebaseapp.com"
        })
    }else {
        firebase.app();
    }

    /* let provider = new firebase.auth.GoogleAuthProvider(); */

    /* firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
        var credential: firebase.auth.OAuthCredential = result.credential;
        var token = credential.accessToken;
        console.log('token: ' + token)
        var user = result.user;
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
    });
 */
    const [signedIn, setSignedIn] = useState(false)
    const dispatch = useDispatch()

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]/* ,
        callbacks: {
            signInSuccess: () => false
        } */
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setSignedIn(!!user)
        })
    }, [dispatch])

    firebase.auth().currentUser && console.log(firebase.auth().currentUser)

    /* const responseGoogle = (response) => {
        console.log(response)
        console.log(response.profileObj)
    }


    const responseFacebook = (response) => {
        console.log(response)
    }
 */
    return  (
        <div>
            <h1>Te damos la bienvenida a Reservar</h1>
            <h2>Crea una cuenta</h2>
            <div>
                <button>Soy Viajero</button>
                <button>Soy Host</button>
            </div>
            <div>

                {
                    signedIn ?
                    <div>
                        <p>Hello, {firebase.auth().currentUser.displayName}</p>
                        <img src={firebase.auth().currentUser.photoURL} alt="user"/>
                        <button onClick={() => firebase.auth().signOut()}>
                            Sign Out
                        </button>
                    </div>

                    :
                    (<StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />)
                    }
                </div>
            <span>Ya tienes una cuenta? Ingresa <Link to="/login">AQUI</Link></span>
            {/* <GoogleLogin
                clientId="283885012153-bsj812gn457gvnqnoq6u1p2oup9t1304.apps.googleusercontent.com"
                buttonText="Iniciar Sesión con Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
            <FacebookLogin
                appId="516762732768499"
                autoLoad={false}
                fields="name,email,picture"
                callback={responseFacebook}
                textButton="Iniciar sesión"
                icon="fa-facebook"
            /> */}
        </div>
    )
}

export default Register