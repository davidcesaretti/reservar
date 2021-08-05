import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetPosts } from "../../actions/index";
import { useAuth } from "../../firebase/index";
import style from "./Earnings.module.css";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Spinner from "../Spinner/Spinner";
import MenuAdmin from "../menuAdmin/MenuAdmin";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingTop: "1rem",
    marginTop: "1rem",
    color: "black",
    textShadow: "1.4px 1.4px 1px #B2B1B9",
    fontSize: "calc(2vw + 1em)",
  },
}));

const Earnings = ({ setSection }) => {
  const classes = useStyles();
  const auth = useAuth();
  const dispatch = useDispatch();
  const [income, setIncome] = useState(0);
  const [reserved, setReserved] = useState(false);
  const [loaded, setLoaded] = useState(true);

  const userPosts = useSelector((state: any) => state.getAllPosts);

  let month = new Date().toLocaleString("en-US", { month: "long" });
  let year = new Date().getFullYear();

  const email = auth?.user?.email;

  const filterFake = userPosts.map(
    (
      x //nuevo
    ) => x.available.filter((y) => y.state !== "fake")
  );

  userPosts.forEach((x, i) => (x.available = filterFake[i])); 

  useEffect(() => {
    dispatch(GetPosts());
  }, [dispatch, loaded]);

  let cont = 0;

  if (loaded && userPosts.length > 0) {
    userPosts.map((e) => {
      if (e.available.length > 0) {
        setReserved(true)
      };
      cont += e.available?.reduce((acum, e) => {
        return acum + e.price;
      }, 0);
    });
    setIncome(cont);
    setLoaded(false);
  }



  return (
    <div className="con-homeAdmin">
      <MenuAdmin />
      <div className={style.container}>
        <Grid>
          <Typography className={classes.title} variant="h4" align="center">
            Earnings
          </Typography>
        </Grid>
        {loaded === true ? (
          <Spinner />
        ) : reserved ? (
          <div>
            <h1 className={style.title}>BALANCE SHEET</h1>
            <h3 className={style.subTitle1}>
              Current month: {month} {year}
            </h3>
            <div className={style.ctnOut}>
              <div className={style.ctnIn}>
                <div className={style.field}>
                  <h2 className={style.titleField}>
                    GROSS INCOME
                    <span className={style.subTitleField}>
                      (All my properties included)
                    </span>
                  </h2>
                  <h4 className={style.numberField}>${income} USD</h4>
                  <p className={style.footerField}>Update daily</p>
                </div>
                <div className={style.field}>
                  <h2 className={style.titleField}>10% NET INCOME</h2>
                  <h4 className={style.numberField}>
                    ${Math.floor(income - income * 0.9)} USD
                  </h4>
                  <p className={style.footerField}>Update daily</p>
                </div>
              </div>
            </div>

            <div className={style.propertiesData}>
              {userPosts?.map((f) => {
                return f.available?.map((e) => {
                  return (
                    <div className={style.propertie} key={e._id}>
                      <div>
                        <h3>{e.fechaLlegada.slice(0, 10)}</h3>
                        <p>Reservation: <b>{e._id}</b></p>
                        <p>Property: <b>{e.propname}</b></p>
                      </div>
                      <div>
                        <p>Gross Income: <b>{e.price}</b></p>
                        <p>Net Income: <b>{Math.floor(e.price - e.price * 0.9)}</b></p>
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        ) : (
          <div className={style.ctnMessage}>
            <div className={style.message}>You dont have earnings yet</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Earnings;
