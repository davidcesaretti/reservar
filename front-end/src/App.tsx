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
import UserPosts from "./components/UserPosts/UserPosts";
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
      <Route exact path="/add" component={AddProperty} />
      <Route exact path="/userpost" component={UserPosts} />
      <Route exact path="/AddProperty/:id" component={AddProperty} />
    </Switch>
  );
}

export default App;
