import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./actions";
import Card from "../src/components/Card/Card"
import Footer from "../src/components/Footer/Footer";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "./components/Nav/nav";
import Home from "./components/Home/Home";

const useStyles = makeStyles((theme) => ({
  offset: theme.mixins.toolbar,
}));

function App() {
  const dispatch = useDispatch();
  const user = useSelector((s: any) => s);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className="App">
      <NavBar/>
      <Home />
      <header className="App-header">
        <Card/>
      </header>
      <Button variant="contained" >
        holaaa
      </Button>
      {user.users &&
        user.users.map((x) => (
          <div>
            <p style={{ color: "white" }}></p>
          </div>
        ))}
        <Footer/>
    </div>
  );
}

export default App;
