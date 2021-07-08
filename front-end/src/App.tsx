import React, { useEffect, useState } from "react";
import "./App.css";
import { Route } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { fetchUsers } from "./actions";
import Login from './components/login/login'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  
  return (
    <>
      <Route exact path='/login' component={Login} ></Route>
    </>
  );
}

export default App;
