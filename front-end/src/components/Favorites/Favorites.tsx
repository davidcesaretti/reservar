import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavos } from "../../actions";
import style from "./Favorites.module.css";
import { useAuth } from "../../firebase/index";

const Favorites = () => {
  const dispatch = useDispatch();
  const auth = useAuth();
  let email = auth.user.email;

  useEffect(() => {
    dispatch(getFavos(email));
  }, []);

  return (
    <div>
      <h3>FAVORITES</h3>
      <div>LISTA DE PROPIEDADES FAVORITAS</div>
    </div>
  );
};

export default Favorites;
