import React, { useEffect, useRef, useState } from "react";
import "./chat.css";
import { useAuth } from "../../firebase/index";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function Chat() {
  const auth = useAuth();
  const user = auth.user;

  return (
    <div className="chat">
      <header className="head">
        <h3>Chat With your host</h3>
        <SignOut />
      </header>

      <section className="sec">{user ? <ChatRoom /> : <SignIn />}</section>
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
  const bookings = useSelector((state: any) => state.bookchat);
  let chatcollection = [];
  bookings.map((e) =>
    e.host ? chatcollection.push(e.host + e.info_user) : ""
  );
  const [collec, setCollec] = useState(
    chatcollection[0] ? chatcollection[0] : "nores"
  );

  const messagesRef = firestore.collection(collec);
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  let handleC = (e) => {
    setCollec(e.currentTarget.value);
    console.log("seteando collec  ", e.currentTarget.value);
  };

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
      console.log(chatcollection);

      setFormValue("");
    }
  };

  return (
    <>
      {chatcollection.length > 0 ? (
        <>
          <main className="maiin">
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </main>

          <form className="foorm" onSubmit={sendMessage}>
            <input
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="type here"
            />

            <button className="btn" type="submit" disabled={!formValue}>
              Send
            </button>
            <div className="collections">
              {chatcollection &&
                chatcollection.map((e) => (
                  <button className="btn" value={e} onClick={handleC}>
                    Select Collection {e}
                  </button>
                ))}
            </div>
          </form>
        </>
      ) : (
        <div>realiza una reserva para ver sus chats</div>
      )}
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
