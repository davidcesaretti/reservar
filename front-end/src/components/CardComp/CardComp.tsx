import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea"
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/index";

import ApartmentIcon from '@material-ui/icons/Apartment';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import HotelIcon from '@material-ui/icons/Hotel';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

// import { RootState } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
    },
    media: {
      height: 200,
    },
    title: {
      color: theme.palette.primary.main
    },
    icono: {
   
    }
  })
);


export default function CardComp({name, type, beds, price, image, score, address, accommodates}) {
  const classes = useStyles();
  
      return (
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Room Deluxe">
         <StarBorderIcon></StarBorderIcon>
         {score}
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
          {name}
          </Typography>
        </CardContent>
           <CardContent>
         <ApartmentIcon></ApartmentIcon>
         {type}
         <AddLocationIcon></AddLocationIcon>
         {address}
         <AccountCircleIcon></AccountCircleIcon>
         {accommodates}
         <HotelIcon></HotelIcon>
         {beds}
         <MonetizationOnIcon></MonetizationOnIcon>
         {price}
        </CardContent>
      </CardActionArea>
    </Card>
      );
    }