import React, { useState } from "react";
import "./chat.css";
import { useAuth } from "../../firebase/index";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { SetCollection } from "../../actions";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function Chat() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const user = auth.user;
  const bookings = useSelector((state: any) => state.bookchat);

  let handleC = (e) => {
    dispatch(SetCollection(e.currentTarget.value));
    console.log("seteando collec  ", e.currentTarget.value);
  };

  return (
    <div className="container">
      <div className="collections">
        <p className="select"> Select you reservation:</p>

        {bookings &&
          bookings.map((e) => (
            <button
              key={e}
              className="btn2"
              value={e?.host + e?.info_user}
              onClick={handleC}
            >
              Arrival: {e.fechaSalida} <br />
              Departure: {e.fechaLlegada}
            </button>
          ))}
      </div>
      <div className="chat">
        <header className="head">
          <h3>Chat With your host</h3>
          <SignOut />
        </header>

        <section className="sec">{user ? <ChatRoom /> : <SignIn />}</section>
      </div>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const collec = useSelector((state: any) => state.collection);

  const messagesRef = firestore.collection(collec ? collec : "nores");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { email, photoURL } = auth.currentUser;

    if (formValue.length > 0) {
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        email,
        photoURL,
      });

      setFormValue("");
    }
  };

  return (
    <>
      <>
        <main className="maiin">
          {messages &&
            messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        </main>

        <form className="foorm" onSubmit={sendMessage}>
          <input
            className="inpuu"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="type here"
          />

          <button className="btn" type="submit" disabled={!formValue}>
            Send
          </button>
        </form>
      </>
    </>
  );
}

function ChatMessage(props) {
  const { text, email, photoURL } = props.message;

  const messageClass = email === auth.currentUser.email ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          className="imag"
          src={
            photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"
          }
          alt="noimg"
        />

        <p>{text}</p>
      </div>
    </>
  );
}

export default Chat;
