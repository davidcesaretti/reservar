import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register2";
import Home from "./components/Home/Home";
import Calendary from "./components/Calendary/Calendary";
import Album from "./components/Cards/Cards";
import Filters from "./components/Filters/Filters";
import DetailHotel from "./components/DetailHotel/DetailHotel";

import Perfil from './components/Perfil/Perfil';
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      
      <Route exact path="/filters" component={Filters} />
      <Route exact path="/categories" component={Album} />
      <Route exact path="/categories/:id" component={DetailHotel}/>
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/Calendary" component={Calendary} />
      <Route exact path="/perfil" component={Perfil} />
      <Route exact path="/Filters" component={Filters} />
      <Route exact path="/Categories" component={Album} />
    </Switch>
  );
}

export default App;
