import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage'
/* require('dotenv').config();

const {
    FIREBASE_API_KEY,
    AUTH_DOMAIN_FIREBASE,
    PROJECT_ID_FIREBASE,
    STORAGE_BUCKET_FIREBASE,
    MESSAGING_SENDER_ID_FIREBASE,
    APP_ID_FIREBASE,
} = process.env */

const firebaseConfig = {
    apiKey: "AIzaSyBh2wY42foyI4uwoW9wfIKtCz2ie-mXELw",
    authDomain:  "reservar-319305.firebaseapp.com",
    projectId: "reservar-319305",
    storageBucket: "reservar-319305.appspot.com",
    messagingSenderId: "283885012153",
    appId: "1:283885012153:web:34dacf6265a072b3910768"
};

firebase.initializeApp(firebaseConfig);

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const signin = (email, password) => {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
        })
    }
    const signup = (email, password) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                return response.user;
            });
    };
    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(false);
            });
    };
    const sendPasswordResetEmail = (email) => {
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };
    const confirmPasswordReset = (code, password) => {
        return firebase
            .auth()
            .confirmPasswordReset(code, password)
            .then(() => {
                return true;
            });
    };
      // Subscribe to user on mount
      // Because this sets state in the callback it will cause any ...
      // ... component that utilizes this hook to re-render with the ...
      // ... latest auth object.
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
        }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
    }, []);
    // Return the user object and auth methods
    return {
        user,
        signin,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}

const storage = firebase.storage();

export {storage, firebase as default};