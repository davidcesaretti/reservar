import React, { useEffect } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea"
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ApartmentIcon from '@material-ui/icons/Apartment';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HotelIcon from '@material-ui/icons/Hotel';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import {Link} from "react-router-dom"

// import { RootState } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
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
      paddingRight: "13px"
    },
    card:{
      display: "flex"
    },
    icon:{
      marginRight: "5px"
    },
    iconfav:{
      color:"black", 
      padding: "5px",
      background: "#8b96c175",
      fontSize: "1.2rem"
    }
    
  })
);


export default function CardComp({_id, name, type, beds, price, image, score, address, accommodates}) {
  const classes = useStyles();
  
      return (
        <Link to={`/categories/${_id}`}>
      <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={image}
          title="Room Deluxe">
        
        <IconButton aria-label="add to favorites" className={classes.iconfav}>
          <FavoriteIcon style={{color: "white"}}/>
        </IconButton>
           <IconButton className={classes.iconfav}>
         <StarBorderIcon style={{color: "white"}} />
           </IconButton>
           <IconButton style={{color: "white", padding:"initial"}}>
              {score}
           </IconButton>
           
        </CardMedia>
        <CardContent style={{padding: "15px"}}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.title} style={{marginBottom:"-5px"}}>
          {name}
          </Typography>
          </CardContent>

        <CardContent style={{padding: "16px 0 12px 10px"  }}>
          <div  className={classes.icono}>
        <AddLocationIcon >    
        </AddLocationIcon>
         {address}
          </div>
        </CardContent>



        <CardContent style={{padding: "12px 0 12px 10px"  }}>
          <div className={classes.card}>

            <div className={classes.icono}>
         <ApartmentIcon className={classes.icon}></ApartmentIcon>{type}
            </div>

            <div className={classes.icono}>
        <AccountCircleIcon className={classes.icon}></AccountCircleIcon>{accommodates}
           </div>

            <div className={classes.icono}>
         <HotelIcon className={classes.icon}></HotelIcon>{beds}
            </div>

            <div className={classes.icono}>
         <MonetizationOnIcon className={classes.icon}></MonetizationOnIcon>{price}
            </div>
         </div >
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
      );
    }