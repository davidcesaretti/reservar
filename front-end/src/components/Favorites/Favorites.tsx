import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardComp from "../CardComp/CardComp";
import style from "./Favorites.module.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";

import { useAuth } from "../../firebase/index";
import { UserEmailGlobal } from "../../actions";

const Favorites = () => {
  const auth = useAuth();
  let email = auth.user.email;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserEmailGlobal(email));
  }, []);

  const falseclick = () => {
    ("");
  };

  return (
    <div>
      <h3>FAVORITES</h3>

      <div>LISTA DE PROPIEDADES FAVORITAS</div>
    </div>
  );
};

export default Favorites;

/*  {fav?.favos &&
        fav?.favos?.map((e) => (
          <Grid item key={e} xs={12} sm={6} md={6}>
            <Card>
              <CardComp
                _id={e._id}
                image={e.image}
                score={e.score}
                name={e.name}
                type={e.type}
                address={e.address}
                accommodates={e.accommodates}
                beds={e.beds}
                price={e.price}
                click={falseclick}
              />
            </Card>
          </Grid> */
