import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Icon from "@material-ui/core/Icon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Keyboard: {
    margin: 0
  },
  arrow: {
    marginTop: "0.5em",

    opacity: "0.5",

    "&:hover": {
      opacity: "0.8",
      cursor: "pointer"
    }
  },
  expand: {
    marginTop: 0,
    display: "inline"
  }
});

export default function DatePicker(props) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    props.onChangeDate(date.toISOString().split("T")[0]);
  };
  const toNextDate = () => {
    const date = new Date();
    date.setDate(selectedDate.getDate() + 1);
    setSelectedDate(date);
    handleDateChange(date);
  };
  const toPrevDate = () => {
    const date = new Date();
    date.setDate(selectedDate.getDate() - 1);
    setSelectedDate(date);
    handleDateChange(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container>
        <Grid xs={1} container item></Grid>
        <Grid xs={10} container item justify="center">
          <Icon className={classes.arrow} onClick={toPrevDate}>
            arrow_back_ios
          </Icon>
          <KeyboardDatePicker
            className={classes.Keyboard}
            disableToolbar
            variant="inline"
            format="yyyy년 MM월 dd일"
            margin="normal"
            id="date-picker-inline"
            label="날짜"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <Icon className={classes.arrow} onClick={toNextDate}>
            arrow_forward_ios
          </Icon>
        </Grid>
        <Grid xs={1} container item justify="flex-end">
          <Icon onClick={()=>{props.onEditButton()}} className={classes.expand}>open_with</Icon>
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
