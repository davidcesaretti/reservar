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
import Chat from "./components/Chat/Chat";
import ChatHost from "./components/ChatHost/ChatHost";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ValidationAdmin from "./components/ValidationAdmin/ValidationAdmin";
import Error404 from "./components/Error404/Error404";
import MenuAdmin from "./components/menuAdmin/MenuAdmin";
import TablaAdmin from "./components/TablaAdmin/TablaAdmin";
import FAQ from "./components/FAQ/FAQ"
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import GeneralBalance from "./components/GeneralBalance/GeneralBalance"
import Earnings from "./components/Earnings/Earnings"
import TablaAdminLodging from "./components/TablaAdminLodging/TablaAdminLodging"
function App() {
  const auth = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/categories" component={Album} />
      <Route exact path="/categories/:id" component={DetailHotel} />
      <Route exact path="/Login" component={Login} />
      <Route exact path="/Register" component={Register}/>
      <Route exact path="/Filters" component={Filters} />
      <Route exact path="/Categories" component={Album} />
      <Route exact path="/payments" component={Pay} />
      <Route exact path="/favourites" component={Favorites} />
      <Route exact path="/Calendary" component={Calendary} />
      <Route exact path="/User" component={auth?.user ? User : Register} />
      <Route exact path="/AddProperty/:id" component={AddProperty} />
      <Route exact path="/chat" component={Chat} />
      <Route exact path="/chathost" component={ChatHost} />
      <Route exact path="/Admin" component={auth?.user?.email === "trekkerhenry@gmail.com" ? AdminDashboard : Error404} />
      {/* <Route exact path="/validationAdmin" component={ValidationAdmin} />
      <Route exact path="/homeAdmin" component={MenuAdmin} /> */}
      <Route exact path="/tablalodging" component={auth?.user?.email === "trekkerhenry@gmail.com" ? TablaAdminLodging : Error404}  />
      <Route exact path="/homeAdminTabla" component={auth?.user?.email === "trekkerhenry@gmail.com" ? TablaAdmin : Error404}  />
      <Route exact path="/FAQ" component={auth?.user?.email === "trekkerhenry@gmail.com" ? FAQ : Error404} />
      <Route exact path="/terms" component={auth?.user?.email === "trekkerhenry@gmail.com" ? TermsAndConditions : Error404} />
      <Route exact path="/Balance" component={auth?.user?.email === "trekkerhenry@gmail.com" ? GeneralBalance : Error404} />
      <Route exact path="/earnings" component={auth?.user?.email === "trekkerhenry@gmail.com" ? Earnings : Error404} />
      <Route path="*" component={Error404} />
    </Switch>
  );
}

export default App;
