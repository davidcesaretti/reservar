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
import Pay from "./components/Payments/Payment";
import User from "./components/User/User";
import Favorites from "./components/Favorites/Favorites";
import AddProperty from "./components/AddProperty/AddProperty";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard"
import ValidationAdmin from "./components/ValidationAdmin/ValidationAdmin"
import FAQ from "./components/FAQ/FAQ";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import Earnings from "./components/Earnings/Earnings";


function App() {
  const auth = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/categories" component={Album} />
      <Route exact path="/categories/:id" component={DetailHotel} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register} />

      <Route exact path="/Filters" component={Filters} />
      <Route exact path="/Categories" component={Album} />
      <Route exact path="/payments" component={Pay} />
      <Route exact path="/favourites" component={Favorites} />
      <Route exact path="/Calendary" component={Calendary} />
      <Route exact path="/User" component={auth.user ? User : Register} />
      <Route exact path="/AddProperty/:id" component={AddProperty} />
      <Route exact path="/Admin" component={AdminDashboard} />
      <Route exact path="/validationAdmin" component={ValidationAdmin} />
      <Route exact path="/prueba" component={FAQ} />
    </Switch>
  );
}

export default App;
