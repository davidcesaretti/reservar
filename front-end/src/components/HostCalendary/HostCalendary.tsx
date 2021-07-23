import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {  DateRangePicker  }  from  'react-date-range';

const useStyles = makeStyles((theme) => ({
  root: {
  
  },
}));

const selectionRange={
  starDate: new Date(2021,7,23),
  endDate: new Date(2021,7,30),
  key:"selection"

}

export default function HostCalendary() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <DateRangePicker ranges={[selectionRange]}/>
    </div>
  );
}