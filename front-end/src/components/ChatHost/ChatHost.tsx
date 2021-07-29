import React, { useState } from "react";
import "./chathost.css";
import { useAuth } from "../../firebase/index";
import moment from "moment";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useCollectionData } from "react-firebase-hooks/firestore";
import { useDispatch, useSelector } from "react-redux";
import { SetCollection } from "../../actions";
import Button from "@material-ui/core/Button";
import { useEffect } from "react";
import { Collections } from "@material-ui/icons";

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

function ChatHost() {
  const dispatch = useDispatch();
  const auth = useAuth();
  const user = auth.user;
  const bookings = useSelector((state: any) => state.hostres);

  let handleC = (e) => {
    dispatch(SetCollection(e.currentTarget.value));
  };

  /*    <div className="minicard">
              <img src={e.propimg} alt="noImg" className="propimg" />
              <p>{e.propname}</p>
              Arrival: {moment(e.fechaSalida).format("MMMM DD/YYYY")} <br />
              Departure: {moment(e.fechaLlegada).format("MMMM DD/YYYY")}
              <button
                key={e}
                className="btn21"
                value={e?.host + e?.info_user}
                onClick={handleC}
              >
                Chat
              </button>

              function truncate(str, n) {
  return str?.length > n ? str.substring(0, n - 1) + "..." : str; //funcion para recortar parrafos y dejar los ...
}





            </div>  */

  function truncate(str, n) {
    return str?.length > n ? str.substring(0, n - 1) + "..." : str;
  }

  return (
    <div className="box">
      <div className="allcollec">
        <header className="select1">
          <h3>Select your reservation:</h3>
        </header>
        <div>
          {bookings.length > 0 ? (
            <div className="scroll">
              {bookings.length > 0}

              {bookings &&
                bookings.map((e) => (
                  <div className="clase">
                    <div className="clase1">
                      <img src={e.propimg} alt="noImg" className="imgprop" />
                    </div>
                    <div className="clase2">
                      <p>
                        {truncate(e.propname, 20)}
                        <p>
                          From: {moment(e.fechaSalida).format("MMMM DD/YYYY")}
                          <br />
                          To: {moment(e.fechaLlegada).format("MMMM DD/YYYY")}
                        </p>
                      </p>
                    </div>
                    <div className="clase3">
                      <Button
                        variant="contained"
                        color="primary"
                        value={e?.host + e?.info_user + e?.Prop_id}
                        onClick={handleC}
                        className="btncol"
                      >
                        Chat
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="nochat1">You don't have any reservation yet</div>
          )}
        </div>
      </div>

      <div className="allchat">
        <div className="chat1">
          <header className="head1">
            <h3>Chat With your guest</h3>
          </header>

          {user ? <ChatRoom /> : <SignIn />}
        </div>
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
      <button className="sign-in1" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </>
  );
}

function ChatRoom() {
  let collec = useSelector((state: any) => state.collection);

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
    <div>
      {collec ? (
        <div className="allchatwin">
          <main className="maiin1">
            {messages &&
              messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
          </main>

          <form className="foorm1" onSubmit={sendMessage}>
            <input
              className="inpuu1"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="type here"
            />

            <button className="btn1" type="submit" disabled={!formValue}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <div className="nochat">Select a Chat</div>
      )}
    </div>
  );
}

function ChatMessage(props) {
  const { text, email, photoURL } = props.message;

  const messageClass = email === auth.currentUser.email ? "received" : "sent";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          className="imag1"
          src={
            photoURL ||
            "https://w7.pngwing.com/pngs/762/632/png-transparent-computer-icons-share-icon-me-share-icon-me-area.png"
          }
          alt="noimg"
        />

        <p>{text}</p>
      </div>
    </>
  );
}

export default ChatHost;
