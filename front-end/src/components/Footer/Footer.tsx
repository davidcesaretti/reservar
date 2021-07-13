import { Link } from "@material-ui/icons";
import React from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { createTheme, makeStyles } from "@material-ui/core";

const styles = makeStyles((theme) => ({
  footer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    columnGap: "100px",
    marginLeft: "100px",
    textDecoration: "none",
  },
  acercaa: {
    textDecoration: "none",
  },
  acercali: {
    listStyle: "none",
    marginTop: "10px",
  },
  opsa: {
    textDecoration: "none",
  },
  opsli: {
    listStyle: "none",
    marginTop: "10px",
  },
  iconosli: {
    listStyle: "none",
    marginTop: "10px",
  },
  titulo: {
    marginLeft: "38px",
  },
}));

const Footer = () => {
  const classes = styles();

  return (
    <div className={classes.footer}>
      <div>
        <h4 className={classes.titulo}>ABOUT US</h4>
        <ul>
          <li className={classes.acercali}>
            <a className={classes.acercaa} href="">
              HOW IT WORKS?
            </a>
          </li>
          <li className={classes.acercali}>
            <a className={classes.acercaa} href="">
              TERMS AND CONDITIONS{" "}
            </a>
          </li>
          <li className={classes.acercali}>
            <a className={classes.acercaa} href="">
              SITEMAP
            </a>
          </li>
          <li className={classes.acercali}>
            <a className={classes.acercaa} href="">
              FAQ
            </a>
          </li>
          <li className={classes.acercali}>
            <a className={classes.acercaa} href="">
              PRIVACY
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={classes.titulo}>HOST</h4>
        <ul>
          <li className={classes.opsli}>
            <a className={classes.opsa} href="">
              HOST YOUR PLACE
            </a>
          </li>
          <li className={classes.opsli}>
            <a className={classes.opsa} href="">
              RESPONSIBLE HOSTING
            </a>
          </li>
          <li className={classes.opsli}>
            <a className={classes.opsa} href="">
              PREMIUM HOSTING
            </a>
          </li>
          <li className={classes.opsli}>
            <a className={classes.opsa} href="">
              HOSTING EXPERIENCIES
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={classes.titulo}>FOLLOW US</h4>
        <li className={classes.iconosli}>
          <TwitterIcon />
          <InstagramIcon />
        </li>
      </div>
    </div>
  );
};

export default Footer;
