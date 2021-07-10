import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import {Button} from '@material-ui/core'
import {signUser} from '../../actions/index'

const Register = () => {

    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyBh2wY42foyI4uwoW9wfIKtCz2ie-mXELw",
            authDomain: "reservar-319305.firebaseapp.com"
        })
    }else {
        firebase.app();
    }

    const [signedIn, setSignedIn] = useState(false)
    const dispatch = useDispatch()

    const uiConfig = {
        signInFlow: "popup",
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ]
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => {
            setSignedIn(!!user)
        })
        dispatch(signUser())
    }, [dispatch])

    firebase.auth().currentUser && console.log(firebase.auth().currentUser)

    return  (
        <div>
            <h1>Te damos la bienvenida a Reservar</h1>
            <h2>Crea una cuenta</h2>
            <div>
                <Button color="primary" variant="outlined">Soy Viajero</Button>
                <Button color="secondary" variant="contained">Soy Host</Button>
            </div>
            <div>

                {
                    signedIn ?
                    <div>
                        <button onClick={() => firebase.auth().signOut()}>
                            Sign Out
                        </button>
                        <h1>Hello, {firebase.auth().currentUser.displayName}</h1>
                        <img src={firebase.auth().currentUser.photoURL} alt="user"/>
                    </div>

                    :
                    (<StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />)
                    }
                </div>
        </div>
    )
}

export default Register