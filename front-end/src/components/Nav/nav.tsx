import React from "react";
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core'
import RecipeReviewCard from "../Card/Card"

const useStyles = makeStyles(theme => ({
    offset: theme.mixins.toolbar,
    
  }))

 const NavBar = () =>{

    const classes = useStyles()
    return (
        <div>
            <AppBar position="fixed" color="primary">
              <Toolbar>
                <Typography variant="h6">
                  ReservAr
                </Typography>
              </Toolbar>
            </AppBar>
            <div className={classes.offset}></div>
        </div>
    )
}

export default NavBar;