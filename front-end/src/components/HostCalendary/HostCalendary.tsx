import React,{useState,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {  DateRangePicker}  from  'react-date-range';
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import DatePicker from "react-datepicker";
import DatePicker1 from "react-datetime";
import "react-datepicker/dist/react-datepicker.css"
import "react-datetime/css/react-datetime.css"
import moment from "moment";
import { Button, Grid, Modal, TextField } from "@material-ui/core";
import { assertVariableDeclarator } from "@babel/types";
import { isValidElement } from "react";
import { addBusinessDays } from "date-fns/esm";


const useStyles = makeStyles((theme) => ({
  root: {
    position:"absolute",
    top:"13hv",
    left:"30vw",
    [theme.breakpoints.down("sm")]: { 
       top:"16hv",
       left:0,
    }
  },
}));

export default function HostCalendary() {
  const classes = useStyles();
 
  const [startDate,setStartDate]=useState(new Date());
  const [endDate,setEndDate]=useState(new Date());

  let val1=moment();
  const [dts,setDts]=useState(moment());
  const [dte,setDte]=useState(moment());

  const checkin = moment("2021-07-25");
  const checkout = moment("2021-07-29");
  
    var dateArray = [];
    function getDates(startDate, stopDate) {
      var currentDate = moment(startDate);
      var stopDatee = moment(stopDate);
      while (currentDate <= stopDatee) {
          dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
          currentDate = moment(currentDate).add(1, 'days');
      }
      return dateArray;
  }
  getDates(checkin,checkout)

  const customDates=['2021-07-27','2021-07-30'];
  const disableCustomDt= current=>{
    return !dateArray.includes(current.format('YYYY-MM-DD'))
  }
  const disableWeekends = current => {
    return current.day() !== 0 && current.day() !== 6;
  }

  let valor;
  const eleccion =()=>{
    valor=disableWeekends;
    return valor;
  }
 
  return (
    <div className={classes.root}>
       

        <DatePicker1
          /* value={dts}
          dateFormat="DD-MM-YYYY"
          onChange={val1 => setDts(val1)}*/
          timeFormat={false}
          isValidDate={disableCustomDt}
         />
         <DatePicker1
           /*value={dte}
          onChange={val2 => setDte(val2)} */
          timeFormat={false}
          isValidDate={disableCustomDt}
         /> 
        <div>
         <Button
         onClick={eleccion}>
          INHABILITY WEEKS
          <DatePicker1
           timeFormat={false}
           isValidDate={disableWeekends}
            />
         </Button>
       </div>
    </div>
  );
}