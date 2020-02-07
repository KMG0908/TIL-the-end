import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import Icon from "@material-ui/core/Icon";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { setEditModeList, setEditModeCard } from "../../actions";

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

const today = new Date().toISOString().split("T")[0];
function DatePicker(props) {
  const classes = useStyles();

  let [selectedDate, setSelectedDate] = React.useState(new Date());
  if(props.date){
    selectedDate = new Date(props.date);
  }

  const handleDateChange = date => {
    setSelectedDate(date);
    let isoDate = date.toISOString().split("T")[0];
    props.onChangeDate(isoDate);
    if (isoDate > today) {
      props.setEditModeList(null);
      props.setEditModeCard(null);
    }
  };
  const toNextDate = () => {
    const date = selectedDate;
    date.setDate(selectedDate.getDate() + 1);
    setSelectedDate(date);
    handleDateChange(date);
  };
  const toPrevDate = () => {
    const date = selectedDate;
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
          {props.editModeList ? (
            <Icon
              onClick={() => {
                props.setEditModeList(null);
              }}
              className={classes.expand}
            >
              close
            </Icon>
          ) : null}
        </Grid>
      </Grid>
    </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = state => {
  return {
    editModeList: state.editModeList
  };
};

export default connect(mapStateToProps, { setEditModeList, setEditModeCard })(
  DatePicker
);
