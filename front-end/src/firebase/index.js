import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBh2wY42foyI4uwoW9wfIKtCz2ie-mXELw",
    authDomain: "reservar-319305.firebaseapp.com",
    projectId: "reservar-319305",
    storageBucket: "reservar-319305.appspot.com",
    messagingSenderId: "283885012153",
    appId: "1:283885012153:web:34dacf6265a072b3910768"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {storage, firebase as default};