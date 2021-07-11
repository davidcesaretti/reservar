import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Calendary from "./components/Calendary/Calendary";
import Album from "./components/Cards/Cards";
import Filters from "./components/Filters/Filters";
function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />
      <Route exact path="/Calendary" component={Calendary} />
      <Route exact path="/Card" component={Album} />
      <Route exact path="/Filters" component={Filters} />
    </Switch>
  );
}

export default App;
