import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register2";
import Home from "./components/Home/Home";
import Calendary from "./components/Calendary/Calendary";
import Album from "./components/Cards/Cards";
import Filters from "./components/Filters/Filters";
import DetailHotel from "./components/DetailHotel/DetailHotel";
import { useAuth } from "./firebase/index";
import Perfil from "./components/Perfil/Perfil";
function App() {
  const auth = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/categories" component={Album} />
      <Route exact path="/categories/:id" component={DetailHotel} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/Calendary" component={Calendary} />
      <Route exact path="/perfil" component={auth.user ? Perfil : Register} />
      <Route exact path="/Filters" component={Filters} />
      <Route exact path="/Categories" component={Album} />
    </Switch>
  );
}

export default App;
