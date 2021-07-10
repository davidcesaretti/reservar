import React from 'react'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';




export function Calendary() {
  // The first commit of Material-UI
  const  [aux , setAux] = React.useState <Boolean> (false)

  const [arrivalDate, setArrivalDate] = React.useState<Date | null>(
    new Date(),
  );
  const [departureDate, setdepartureDate] = React.useState<Date | null>(
    new Date(),
  );

  const handleDateChange = (date: Date | null) => {
      setArrivalDate(date);
      setAux(true)
    
  };
  const handleChange = (date: Date | null) => {
    setdepartureDate(date);
  };

  // function disableWeekends(date) {
  //   return date.getDay() === 0 || date.getDay() === 6;
  // }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha de salida"
          value={arrivalDate}
          //deshabilitado el 15 de julio
          shouldDisableDate={(date) => date.getTime() === new Date('2021-07-15T00:00').getTime()}
          // shouldDisableDate={disableWeekends}
          disablePast= {true}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha de llegada"
          value={departureDate}
          disablePast= {true}
          onChange={handleChange}
          minDate={arrivalDate}
          disabled={!aux?true:false}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
       
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

export default Calendary