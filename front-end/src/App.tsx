import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch } from "react-redux";
import { fetchUsers } from "./actions";
import Card from "../src/components/Card/Card"
import Footer from "../src/components/Footer/Footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Card/>
      </header>
      <Footer/>
    </div>
  );
}

export default App;
