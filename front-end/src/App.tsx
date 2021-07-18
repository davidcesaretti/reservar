import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register2";
import Home from "./components/Home/Home";
import Calendary from "./components/Calendary/Calendary";
import Album from "./components/Cards/Cards";
import Filters from "./components/Filters/Filters";
import DetailHotel from "./components/DetailHotel/DetailHotel";
import Pay from "./components/Payments/Payment";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/calendary" component={Calendary} />

      <Route exact path="/filters" component={Filters} />
      <Route exact path="/categories" component={Album} />
      <Route exact path="/categories/:id" component={DetailHotel}/>
      <Route exact path="/payments" component={Pay}/>
    </Switch>
  );
}

export default App;
