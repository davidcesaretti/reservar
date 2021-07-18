import React, { useEffect, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/index";

import ApartmentIcon from "@material-ui/icons/Apartment";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import AddLocationIcon from "@material-ui/icons/AddLocation";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AirlineSeatIndividualSuiteIcon from "@material-ui/icons/AirlineSeatIndividualSuite";
import HotelIcon from "@material-ui/icons/Hotel";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import { Link } from "react-router-dom";
import { isTypeOfExpression } from "typescript";

// import { RootState } from '../../store';


 
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
    },
    media: {
      height: 160,
    },
    title: {
      color: theme.palette.primary.main,
    },
    icono: {
      display: "flex",
      alignItems: "center",
      paddingRight: "13px",
    },
    card: {
      display: "flex",
    },
    icon: {
      marginRight: "5px",
    },
    iconfav: {
      color: "black",
      padding: "5px",
      background: "#8b96c175",
      fontSize: "1.2rem",
    },
    iconfavclicked: {
      color: "yellow",
      padding: "5px",
      background: "#8b96c175",
      fontSize: "1.2rem",
    },
  })
);

export default function CardComp({
  _id,
  name,
  type,
  beds,
  price,
  image,
  score,
  address,
  accommodates,
  click,
}) {
  const classes = useStyles();

  const [fav, setFav] = useState(false)
  const favs = useSelector((state: any) => state.favourites);


  // const handleClick =(e) => {
  //   e.preventDefault();
  //   if (favs.favos.includes(e.currentTarget.value)) {
  //     setFav(!fav)
  //   }
  // }
  useEffect(() => {
    if (favs.favos.includes(_id)){
      setFav(!fav)

    }
  }, [favs])


  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title="Room Deluxe">
          <IconButton
            aria-label="add to favorites"
            className={ fav? classes.iconfavclicked : classes.iconfav}
            onClick={click}

            value={_id}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton className={classes.iconfav}>
            <StarBorderIcon />
          </IconButton>
          <IconButton style={{ color: "black", padding: "initial" }}>
            {score}
          </IconButton>
        </CardMedia>
        <Link to={`/categories/${_id}`}>
          <CardContent style={{ padding: "15px" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className={classes.title}
              style={{ marginBottom: "-5px" }}
            >
              {name}
            </Typography>
          </CardContent>
        </Link>
        <CardContent style={{ padding: "16px 0 12px 10px" }}>
          <div className={classes.icono}>
            <AddLocationIcon></AddLocationIcon>
            {address}
          </div>
        </CardContent>

        <CardContent style={{ padding: "12px 0 12px 10px" }}>
          <div className={classes.card}>
            <div className={classes.icono}>
              <ApartmentIcon className={classes.icon}></ApartmentIcon>
              {type}
            </div>

            <div className={classes.icono}>
              <AccountCircleIcon className={classes.icon}></AccountCircleIcon>
              {accommodates}
            </div>

            <div className={classes.icono}>
              <HotelIcon className={classes.icon}></HotelIcon>
              {beds}
            </div>

            <div className={classes.icono}>
              <MonetizationOnIcon className={classes.icon}></MonetizationOnIcon>
              {price}
            </div>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
